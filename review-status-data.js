export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261102T130142Z",
  "review_completed_at_utc": "2026-11-02T13:07:02.388638+00:00",
  "review_event_sha256": "6ba8da31177d0e6a218d501876b8c5bbdd58385e10eeb67262c3a347a68c28af",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "本周累计漂移复核维持 v5 震荡与分化主情景。通胀持续性、薪酬增速放缓、利率回落与盈利支撑并存，暂未确认主情景排序改变。",
  "scope": "核对18项Fed、BEA、Treasury、FRED信用及FactSet公开来源；正文核心读数未变，三项页面仅页脚或相关文章变动。完成W45累计漂移复核。BLS及初请直连失败，复用此前证据；未全面复核新增发行人财报，正式广度尚未验收。",
  "limitations": [
    "BLS及DOL直连失败，相关已公布读数复用旧证据；不能声称本轮重新核验全部发布。",
    "已收取价格文件覆盖10/30，但名单完整覆盖、证券身份与价格连续性尚未验收，正式广度仍UNKNOWN。",
    "未全面复核新增发行人财报、现金流与政策市场计价；保留PARTIAL。"
  ],
  "observations": [
    {
      "label": "Q3实际GDP",
      "value": "3.4% 年化",
      "observation_date": "2026-Q3初值；10/29发布",
      "url": "https://www.bea.gov/index.php/news/2026/gdp-advance-estimate-3rd-quarter-2026",
      "source": "BEA"
    },
    {
      "label": "9月核心PCE",
      "value": "环比0.3% / 同比3.1%",
      "observation_date": "2026-09；10/29发布",
      "url": "https://www.bea.gov/news/2026/personal-income-and-outlays-september-2026",
      "source": "BEA"
    },
    {
      "label": "9月实际消费",
      "value": "近乎持平（不足0.1%）",
      "observation_date": "2026-09；10/29发布",
      "url": "https://www.bea.gov/news/2026/personal-income-and-outlays-september-2026",
      "source": "BEA"
    },
    {
      "label": "2年期美债",
      "value": "4.56%",
      "observation_date": "2026-10-30",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "4.94%",
      "observation_date": "2026-10-30",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.60%",
      "observation_date": "2026-10-30",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "反弹扩大；尚无危机确认",
      "observation_date": "2026-10-29",
      "url": "https://fred.stlouisfed.org/series/BAMLH0A0HYM2",
      "source": "FRED／ICE"
    },
    {
      "label": "初请失业金",
      "value": "19.4万",
      "observation_date": "截至10/24当周；10/29发布",
      "url": "https://www.dol.gov/ui/data.pdf",
      "source": "U.S. DOL"
    },
    {
      "label": "Q3薪酬成本 ECI",
      "value": "季调季增0.8%",
      "observation_date": "截至2026-09三个月；10/30发布",
      "url": "https://www.bls.gov/news.release/eci.nr0.htm",
      "source": "BLS"
    },
    {
      "label": "标普Q3混合盈利增长",
      "value": "30.2% / 已报60%",
      "observation_date": "FactSet 2026-10-30",
      "url": "https://insight.factset.com/sp-500-earnings-season-update-october-30-2026",
      "source": "FactSet"
    }
  ]
};
