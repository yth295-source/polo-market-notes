#!/usr/bin/env python3
"""Reproduce the fixed-design historical risk pilot with public source data.

No API key, sklearn, or scipy is required. Raw downloads are cached in raw/.
Run with --refresh to replace them; design.json is never tuned by this script.
"""
from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import io
import json
from pathlib import Path
import re
import urllib.request
import zipfile

import numpy as np
import pandas as pd

HERE = Path(__file__).resolve().parent
RAW = HERE / "raw"
FEATURES = ["core_cpi_3m", "ff_change_12m", "curve_10y_3m", "credit_change_3m"]
FEATURE_META = {
    "core_cpi_3m": {"label": "核心 CPI 三个月年化", "unit": "%", "source_ids": ["CPILFESL"]},
    "ff_change_12m": {"label": "有效联邦基金利率十二个月变动", "unit": "percentage points", "source_ids": ["FEDFUNDS"]},
    "curve_10y_3m": {"label": "10 年国债−3 个月国库券月均利差", "unit": "percentage points", "source_ids": ["GS10", "TB3MS"]},
    "credit_change_3m": {"label": "Baa−Aaa 收益率差三个月变化", "unit": "percentage points", "source_ids": ["BAA", "AAA"]},
}
FRED = {
    "CPILFESL": "Core CPI, seasonally adjusted index",
    "CPIAUCSL": "Headline CPI, seasonally adjusted index (descriptive only)",
    "FEDFUNDS": "Effective federal funds rate, monthly average",
    "GS10": "10-year Treasury constant maturity yield, monthly average",
    "TB3MS": "3-month Treasury bill yield, discount basis, monthly average",
    "BAA": "Moody's seasoned Baa corporate bond yield, monthly average",
    "AAA": "Moody's seasoned Aaa corporate bond yield, monthly average",
}
FRENCH_URL = "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/ftp/F-F_Research_Data_Factors_CSV.zip"


def download(refresh=False):
    RAW.mkdir(parents=True, exist_ok=True)
    sources = [
        (sid, f"https://fred.stlouisfed.org/series/{sid}",
         f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={sid}&cosd=1988-01-01&coed=2025-12-31", f"{sid}.csv")
        for sid in FRED
    ]
    sources.append(("NASDAQCOM", "https://fred.stlouisfed.org/series/NASDAQCOM",
                    "https://fred.stlouisfed.org/graph/fredgraph.csv?id=NASDAQCOM&cosd=1988-01-01&coed=2025-12-31", "NASDAQCOM.csv"))
    sources.append(("french_market", "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html", FRENCH_URL, "french_factors.zip"))
    old_manifest = {}
    if (RAW / "manifest.json").exists():
        old_manifest = {s["id"]: s for s in json.loads((RAW / "manifest.json").read_text())["sources"]}

    def one(source):
        sid, page, url, name = source
        path = RAW / name
        if refresh or not path.exists():
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 public-data-research/1.0"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                data = resp.read()
            if len(data) < 100:
                raise ValueError(f"Unexpectedly short download for {sid}")
            path.write_bytes(data)
            retrieved = datetime.now(timezone.utc).isoformat()
        else:
            data = path.read_bytes()
            retrieved = old_manifest.get(sid, {}).get("retrieved_utc", "cached; retrieval time unavailable")
        return {"id": sid, "page_url": page, "download_url": url, "file": "raw/" + name,
                "retrieved_utc": retrieved, "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)}

    with ThreadPoolExecutor(max_workers=8) as pool:
        result = list(pool.map(one, sources))
    (RAW / "manifest.json").write_text(json.dumps({"sources": result}, ensure_ascii=False, indent=2))
    return result


def load_data():
    columns = []
    for sid in FRED:
        df = pd.read_csv(RAW / f"{sid}.csv")
        assert len(df.columns) == 2, f"Invalid FRED CSV: {sid}"
        df.index = pd.to_datetime(df.iloc[:, 0]).dt.to_period("M")
        columns.append(pd.to_numeric(df[sid], errors="coerce").rename(sid))
    raw = pd.concat(columns, axis=1).sort_index()
    assert raw.index.is_unique
    # Final signal is June 2025 and predictor observations end in May 2025.
    # October 2025 CPI is unavailable in this vintage; never interpolate it.
    assert raw.loc["1988-01":"2025-05"].notna().all().all(), "Unexpected required-input gaps"
    with zipfile.ZipFile(RAW / "french_factors.zip") as z:
        content = z.read(z.namelist()[0]).decode("utf-8-sig")
    rows = []
    for line in content.splitlines():
        if re.match(r"^\s*\d{6},", line):
            cells = line.split(",")
            rows.append([cells[0].strip()] + [float(s) for s in cells[1:5]])
    market = pd.DataFrame(rows, columns=["month", "mkt_rf", "smb", "hml", "rf"])
    market.index = pd.PeriodIndex(market.pop("month"), freq="M")
    market["total_return"] = (market.mkt_rf + market.rf) / 100
    market = market.loc[:"2025-12"]
    assert market.index.is_unique and market.loc["1990-01":"2025-12"].notna().all().all()
    nd = pd.read_csv(RAW / "NASDAQCOM.csv")
    nd.index = pd.to_datetime(nd.iloc[:, 0])
    nasdaq = pd.to_numeric(nd.NASDAQCOM, errors="coerce").resample("ME").last()
    nasdaq.index = nasdaq.index.to_period("M")
    return raw, market, nasdaq, content.splitlines()[:4]


def make_panel(raw, market):
    p = pd.DataFrame(index=raw.index)
    p["core_cpi_3m"] = 100 * ((raw.CPILFESL.shift(1) / raw.CPILFESL.shift(4)) ** 4 - 1)
    p["ff_change_12m"] = raw.FEDFUNDS.shift(1) - raw.FEDFUNDS.shift(13)
    p["curve_10y_3m"] = raw.GS10.shift(1) - raw.TB3MS.shift(1)
    credit = raw.BAA - raw.AAA
    p["credit_change_3m"] = credit.shift(1) - credit.shift(4)
    p["credit_level"] = credit.shift(1)
    p["fedfunds_level"] = raw.FEDFUNDS.shift(1)
    p["core_cpi_yoy"] = 100 * (raw.CPILFESL.shift(1) / raw.CPILFESL.shift(13) - 1)
    p["headline_cpi_yoy"] = 100 * (raw.CPIAUCSL.shift(1) / raw.CPIAUCSL.shift(13) - 1)
    # Avoid binary float subtraction placing a value exactly on a fixed
    # economic threshold infinitesimally on the wrong side.
    p["curve_flag"] = p.curve_10y_3m.round(10) <= 0
    p["core_flag"] = p.core_cpi_3m.round(10) >= 3
    p["fed_flag"] = p.ff_change_12m.round(10) >= 1
    p["credit_flag"] = p.credit_change_3m.round(10) >= .25
    p["flag_count"] = p[["core_flag", "fed_flag", "curve_flag", "credit_flag"]].sum(axis=1)
    returns = market.total_return.reindex(p.index)
    forward = pd.concat([(1 + returns.shift(-k)) for k in range(1, 7)], axis=1)
    cumulative = forward.cumprod(axis=1) - 1
    # Require all six future months. pandas.min otherwise silently skips missing values.
    complete = forward.notna().all(axis=1)
    p["forward_1m"] = cumulative.iloc[:, 0].where(complete)
    p["forward_3m"] = cumulative.iloc[:, 2].where(complete)
    p["forward_6m"] = cumulative.iloc[:, 5].where(complete)
    p["min_forward_6m"] = cumulative.min(axis=1).where(complete)
    p["event"] = (p.min_forward_6m <= -.15).astype(float).where(complete)
    return p.loc["1990-01":"2025-06"].dropna(subset=FEATURES + ["event"])


def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -40, 40)))


def fit_ridge_logit(x, y):
    mean, scale = x.mean(axis=0), x.std(axis=0, ddof=0)
    a = np.column_stack([np.ones(len(x)), (x - mean) / scale])
    b = np.zeros(a.shape[1])
    b[0] = np.log(y.mean() / (1 - y.mean()))
    penalty = np.diag([0., 1., 1., 1., 1.])
    for iteration in range(100):
        prob = sigmoid(a @ b)
        grad = a.T @ (prob - y) + penalty @ b
        hess = (a.T * (prob * (1 - prob))) @ a + penalty
        step = np.linalg.solve(hess, grad)
        b -= step
        if np.max(np.abs(step)) < 1e-10:
            break
    grad = a.T @ (sigmoid(a @ b) - y) + penalty @ b
    assert np.max(np.abs(grad)) < 1e-6, "Logistic fit did not converge"
    return mean, scale, b, {"iterations": iteration + 1, "max_abs_gradient": float(np.abs(grad).max())}


def auc(y, score):
    positive = y == 1
    ranks = pd.Series(score).rank(method="average").to_numpy()
    n1, n0 = positive.sum(), (~positive).sum()
    return float((ranks[positive].sum() - n1 * (n1 + 1) / 2) / (n1 * n0))


def stats(p):
    n = len(p)
    if not n:
        return {"months": 0}
    return {"months": n, "event_months": int(p.event.sum()), "event_rate": float(p.event.mean()),
            "positive_forward_6m_months": int((p.forward_6m > 0).sum()),
            "mean_forward_1m": float(p.forward_1m.mean()), "mean_forward_3m": float(p.forward_3m.mean()),
            "mean_forward_6m": float(p.forward_6m.mean()), "median_forward_6m": float(p.forward_6m.median()),
            "mean_min_forward_6m": float(p.min_forward_6m.mean())}


def event_clusters(p):
    dates = list(p.index[p.event == 1])
    groups = []
    for date in dates:
        if not groups or date.ordinal != pd.Period(groups[-1]["end"], freq="M").ordinal + 1:
            groups.append({"start": str(date), "end": str(date), "signal_months": 1})
        else:
            groups[-1]["end"] = str(date)
            groups[-1]["signal_months"] += 1
    return groups


def future_path(returns, date):
    r = returns.reindex(pd.period_range(pd.Period(date, freq="M") + 1, periods=6, freq="M"))
    assert r.notna().all()
    return [0.] + ((1 + r).cumprod() - 1).tolist()


def case_row(panel, market, nasdaq, date):
    row = panel.loc[date]
    path = future_path(market.total_return, date)
    npth = future_path(nasdaq.pct_change(fill_method=None), date)
    return {"date": str(date), "input_observation_month": str(pd.Period(date, freq="M") - 1),
            "sample": "holdout" if str(date) >= "2012-01" else "training; descriptive only",
            **row.to_dict(), "monthly_future_path": path,
            "nasdaq_price_only": {"monthly_future_path": npth, "forward_1m": npth[1],
                                   "forward_3m": npth[3], "forward_6m": npth[6],
                                   "min_forward_6m": min(npth[1:])}}


def clean(obj):
    if isinstance(obj, dict):
        return {str(k): clean(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [clean(v) for v in obj]
    if isinstance(obj, (np.integer,)):
        return int(obj)
    if isinstance(obj, (np.floating,)):
        return float(obj)
    if isinstance(obj, (np.bool_,)):
        return bool(obj)
    return obj


def main():
    args = argparse.ArgumentParser()
    args.add_argument("--refresh", action="store_true")
    parsed = args.parse_args()
    design = json.loads((HERE / "design.json").read_text())
    sources = download(parsed.refresh)
    raw, market, nasdaq, french_header = load_data()
    panel = make_panel(raw, market)
    train = panel.loc["1990-01":"2011-06"].copy()
    test = panel.loc["2012-01":"2025-06"].copy()
    mean, scale, beta, fit = fit_ridge_logit(train[FEATURES].to_numpy(), train.event.to_numpy())
    a = np.column_stack([np.ones(len(panel)), (panel[FEATURES].to_numpy() - mean) / scale])
    panel["model_score"] = sigmoid(a @ beta)
    train = panel.loc["1990-01":"2011-06"]
    test = panel.loc["2012-01":"2025-06"]
    baseline = float(train.event.mean())
    model_stats = {}
    for name, subset in [("train", train), ("holdout", test)]:
        y, pred = subset.event.to_numpy(), subset.model_score.to_numpy()
        # 0.5 is specified here only to document the conventional classification
        # result; it is not optimized and is not a recommended trading threshold.
        classified = pred >= .5
        tp = int(np.sum(classified & (y == 1)))
        fp = int(np.sum(classified & (y == 0)))
        tn = int(np.sum(~classified & (y == 0)))
        fn = int(np.sum(~classified & (y == 1)))
        flag = subset.flag_count.to_numpy() >= 2
        model_stats[name] = {**stats(subset), "brier": float(np.mean((pred - y) ** 2)),
                             "constant_train_baseline_brier": float(np.mean((baseline - y) ** 2)),
                             "always_no_event_brier": float(np.mean(y ** 2)),
                             "auc": auc(y, pred), "mean_model_score": float(pred.mean()),
                             "min_model_score": float(pred.min()), "max_model_score": float(pred.max()),
                             "event_clusters": event_clusters(subset), "classification_threshold": .5,
                             "confusion": {"tp": tp, "fp": fp, "tn": tn, "fn": fn},
                             "precision": tp / (tp + fp) if tp + fp else None,
                             "recall": tp / (tp + fn) if tp + fn else None,
                             "caution_flag_months": int(flag.sum()),
                             "caution_flag_false_positive_months": int(np.sum(flag & (y == 0))),
                             "caution_flag_precision": float(y[flag].mean()) if flag.any() else None,
                             "caution_flag_recall": float(np.sum(flag & (y == 1)) / np.sum(y == 1))}
    flag_stats = {}
    for name, subset in [("full", panel), ("train", train), ("holdout", test)]:
        flag_stats[name] = {"baseline": stats(subset),
                            "caution_ge2": stats(subset[subset.flag_count >= 2]),
                            "not_caution_lt2": stats(subset[subset.flag_count < 2]),
                            "by_count": {str(k): stats(subset[subset.flag_count == k]) for k in range(5)}}
    cases = []
    for date in design["cases"]:
        cases.append(case_row(panel, market, nasdaq, date))
    # Mechanical selection: first month of each caution episode, then only episodes
    # with no target event and positive six-month return. Earliest three holdout cases.
    episode_start = (test.flag_count >= 2) & ~(test.flag_count.shift(1).fillna(0) >= 2)
    false_alarm = test[episode_start & (test.event == 0) & (test.forward_6m > 0)]
    false_examples = [case_row(panel, market, nasdaq, i) for i in false_alarm.head(3).index]
    non_event_episode_examples = [case_row(panel, market, nasdaq, i)
                                  for i in test[episode_start & (test.event == 0)].head(3).index]
    missed = test[(test.event == 1) & (test.flag_count < 2)]
    # First month of each consecutive missed-target run, not cherry-picked worst month.
    missed_starts = [i for i in missed.index if i - 1 not in missed.index]
    missed_examples = [case_row(panel, market, nasdaq, i) for i in missed_starts]
    worst_date = panel.min_forward_6m.idxmin()
    for s in sources:
        s["name"] = FRED.get(s["id"], {"french_market": "Kenneth French US market research total returns", "NASDAQCOM": "Nasdaq Composite daily price index, FRED/Nasdaq"}.get(s["id"]))
        s["used_range"] = "1988-01 through 2025-12" if s["id"] != "french_market" else "1990-01 through 2025-12"
    result = {
        "id": "historical-pilot-v1", "run_date": "2026-10-17", "design": design,
        "design_sha256": hashlib.sha256((HERE / "design.json").read_bytes()).hexdigest(),
        "script_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "headline": "Retrospective fixed-design pilot; evaluate holdout before interpreting 2000 examples",
        "sources": sources, "source_series": FRED, "french_file_header": french_header,
        "target_market": "Broad US CRSP value-weighted market total return from French Mkt-RF + RF, not S&P 500 or Nasdaq",
        "sample": {"first_signal": str(panel.index.min()), "last_signal": str(panel.index.max()),
                   "months": len(panel), "last_outcome": "2025-12", "purged_signal_months": "2011-07 through 2011-12"},
        "feature_definitions": [{**f, **FEATURE_META[f["id"]], "lag_months": 1} for f in design["features"]],
        "model": {"features": FEATURES, "training_mean": dict(zip(FEATURES, mean)),
                  "training_std": dict(zip(FEATURES, scale)), "intercept": float(beta[0]),
                  "coefficients_per_training_sd": dict(zip(FEATURES, beta[1:])), "solver": fit,
                  "penalty": 1, "status": "failed_on_fixed_holdout; do not use as a live crash probability",
                  "constant_train_event_probability": baseline, "performance": model_stats},
        "flags": flag_stats, "cases": cases,
        "worst_observed_forward_window": {"selection": "Lowest min_forward_6m in the fixed full monthly sample; retrospective outcome selection, not a causal worst environment",
                                            **case_row(panel, market, nasdaq, worst_date)},
        "false_positive_selection": "First three chronological holdout starts of >=2-flag episodes with no target event and positive six-month return",
        "false_positive_examples": false_examples,
        "non_event_caution_episode_selection": "First three chronological holdout starts of >=2-flag episodes with no target event, without requiring positive return. Added as descriptive fallback because the originally specified positive-return episode selection is empty; model and thresholds unchanged.",
        "non_event_caution_episode_examples": non_event_episode_examples,
        "missed_target_selection": "First month of each consecutive holdout run with event=1 but <2 flags",
        "missed_target_examples": missed_examples,
        "data_checks": {"all_required_predictor_observations_present": True, "missing_values_interpolated": False,
                        "all_target_windows_have_six_months": True, "train_standardization_only": True,
                        "input_missing_not_used": "2025-10 CPI is missing; no interpolation; final signal 2025-06 only requires inputs through 2025-05",
                        "holdout_event_cluster_warning": "Three consecutive positive-label runs, mostly two underlying selloff periods (COVID and 2022); not six independent crises"},
        "limitations": [
            "Current revised-vintage inputs and current French research returns; this is not a historical point-in-time backtest.",
            "All inputs lagged one month as a conservative publication proxy; actual release calendars/vintages were not reconstructed.",
            "Monthly targets overlap. Event months and caution months are not independent observations; apparent sample size overstates independent crises.",
            "Broad US market returns do not measure Nasdaq's concentrated dot-com losses.",
            "Minimum future month-end loss relative to signal date is not daily maximum drawdown and can miss a large drop from an intervening peak.",
            "Four macro variables omit valuation, leverage, equity concentration, earnings revisions and exogenous shocks; COVID is a likely miss.",
            "BAA minus AAA is a yield-difference proxy affected by maturity, composition and liquidity, not an option-adjusted credit spread.",
            "GS10 minus discount-basis TB3MS is a familiar macro slope proxy, not a perfectly convention-matched traded curve.",
            "French changed from FIZ to CIZ starting with the January 2025 release, changing dividend reinvestment convention and revising historical files.",
            "Observational regression is not a causal estimate. Historical similarity does not identify a crash probability.",
            "A single fixed split gives limited evidence; thresholds and penalty were not optimized. No claim of calibrated live probabilities or validated alpha.",
            "No 2026 model inference is produced from the snapshot because its daily mixed-frequency observations are incompatible with these lagged monthly inputs."
        ],
    }
    result = clean(result)
    (HERE / "historical-pilot-results.json").write_text(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))
    panel.index = panel.index.astype(str)
    panel.to_csv(HERE / "historical-pilot-panel.csv", float_format="%.10f", index_label="signal_month")
    print(json.dumps({"sample": result["sample"], "performance": result["model"]["performance"],
                      "cases": result["cases"], "false_positive_examples": result["false_positive_examples"]}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
