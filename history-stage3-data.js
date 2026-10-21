// Aggregate summary copied from the hash-verified Stage 3 v1 seal. No stock-level or membership data.
export const STAGE3 = {
  "version": "stage3-v1",
  "evaluatedAt": "2026-10-18",
  "developmentOnly": true,
  "newTestRunForThisRefresh": false,
  "matureStart": "2019-02",
  "matureEnd": "2026-03",
  "matureMonths": 86,
  "positiveMonths": 6,
  "negativeMonths": 80,
  "independentEvents": 2,
  "immatureMonths": "2026-04—2026-09",
  "rows": [
    {
      "rule": "T",
      "label": "信用单独",
      "alerts": [
        7.0,
        7.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        7.0,
        7.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        73.0,
        73.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.0875,
        0.0875
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        1.0,
        1.0
      ],
      "false_alert_f6_mean": [
        0.09216378362955603,
        0.09216378362955603
      ]
    },
    {
      "rule": "C",
      "label": "旧行业代理单独",
      "alerts": [
        17.0,
        17.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        17.0,
        17.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        63.0,
        63.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.2125,
        0.2125
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        4.0,
        4.0
      ],
      "false_alert_f6_mean": [
        0.09873305707632245,
        0.09873305707632245
      ]
    },
    {
      "rule": "TC",
      "label": "信用 + 旧行业代理",
      "alerts": [
        4.0,
        4.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        4.0,
        4.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        76.0,
        76.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.05,
        0.05
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        1.0,
        1.0
      ],
      "false_alert_f6_mean": [
        0.08795763895815206,
        0.08795763895815206
      ]
    },
    {
      "rule": "VTC",
      "label": "估值 + 信用 + 旧行业代理",
      "alerts": [
        4.0,
        4.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        4.0,
        4.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        76.0,
        76.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.05,
        0.05
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        1.0,
        1.0
      ],
      "false_alert_f6_mean": [
        0.08795763895815206,
        0.08795763895815206
      ]
    },
    {
      "rule": "B",
      "label": "个股广度单独",
      "alerts": [
        22.0,
        22.0
      ],
      "tp": [
        1.0,
        1.0
      ],
      "fp": [
        21.0,
        21.0
      ],
      "fn": [
        5.0,
        5.0
      ],
      "tn": [
        59.0,
        59.0
      ],
      "precision": [
        0.045454545454545456,
        0.045454545454545456
      ],
      "recall": [
        0.16666666666666666,
        0.16666666666666666
      ],
      "fpr": [
        0.2625,
        0.2625
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        3.0,
        3.0
      ],
      "false_alert_f6_mean": [
        0.12283676522935041,
        0.12283676522935041
      ]
    },
    {
      "rule": "TB",
      "label": "信用 + 个股广度",
      "alerts": [
        7.0,
        7.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        7.0,
        7.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        73.0,
        73.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.0875,
        0.0875
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        1.0,
        1.0
      ],
      "false_alert_f6_mean": [
        0.09216378362955603,
        0.09216378362955603
      ]
    },
    {
      "rule": "VTB",
      "label": "估值 + 信用 + 个股广度",
      "alerts": [
        7.0,
        7.0
      ],
      "tp": [
        0.0,
        0.0
      ],
      "fp": [
        7.0,
        7.0
      ],
      "fn": [
        6.0,
        6.0
      ],
      "tn": [
        73.0,
        73.0
      ],
      "precision": [
        0.0,
        0.0
      ],
      "recall": [
        0.0,
        0.0
      ],
      "fpr": [
        0.0875,
        0.0875
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        1.0,
        1.0
      ],
      "false_alert_f6_mean": [
        0.09216378362955603,
        0.09216378362955603
      ]
    },
    {
      "rule": "V",
      "label": "估值单独",
      "alerts": [
        86.0,
        86.0
      ],
      "tp": [
        6.0,
        6.0
      ],
      "fp": [
        80.0,
        80.0
      ],
      "fn": [
        0.0,
        0.0
      ],
      "tn": [
        0.0,
        0.0
      ],
      "precision": [
        0.06976744186046512,
        0.06976744186046512
      ],
      "recall": [
        1.0,
        1.0
      ],
      "fpr": [
        1.0,
        1.0
      ],
      "episode_hits": [
        1.0,
        1.0
      ],
      "episode_misses": [
        1.0,
        1.0
      ],
      "episode_threshold_lead_median": [
        6.0,
        6.0
      ],
      "false_alert_f6_mean": [
        0.0943992612953177,
        0.0943992612953177
      ]
    }
  ],
  "verifiedSources": [
    {
      "file": "comparison.csv",
      "sha256": "baa605eda499da837694949882b85563bed640789eb24b94441f2c72bf0a1c07"
    },
    {
      "file": "episode-comparison.csv",
      "sha256": "284b617f8a2cfd95581cdced5fdf10ee9131e278a31253767161fc817b2d0423"
    },
    {
      "file": "report.md",
      "sha256": "dba267d3ccb5e8d527429e351369ac170848e52af036ea6c03cc04d0c5d19eba"
    },
    {
      "file": "promotion-decision.json",
      "sha256": "335b7186393326cc002d5cb8db7c9e5c3e48b7e0d9ad12145d0936731d9a8198"
    }
  ],
  "manifestSha256": "45b22d6a3e8d8c20456f6149a2e4c522ed6e4cd5e1a9dc6198bcfd619c7fdae8",
  "designSha256": "6a615481534fc1ac214015390d8da11259699adeca6a7a4ed01e88d89a5464cc"
};
