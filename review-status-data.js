export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261102T220301Z",
  "review_completed_at_utc": "2026-11-02T22:04:21.020322+00:00",
  "review_event_sha256": "91947dcc7574a4a7800e5f15e5f3c19b978e16fbab27a70ee0bcdb9899d44dd9",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持v5震荡与分化主情景；信用利差扩大、模型隐含风险溢价上升，继续观察。名义与实际利率变化方向不同，尚不足以确认主情景逆转。",
  "scope": "检查18项公开来源。11/2美债曲线及10/30信用观察更新；NYU公布11/1隐含ERP，但其利率输入口径仍需核对。Fed、BEA及既有盈利报告核心正文未变。新增FactSet播客仅发现标题，未审听。BLS/DOL直连失败，复用旧证据。",
  "limitations": [
    "BLS及DOL直连失败，相关已公布读数复用旧证据；不能声称本轮重新核验全部发布。",
    "已收取价格文件覆盖10/30，但名单完整覆盖、证券身份与价格连续性尚未验收，正式广度仍UNKNOWN。",
    "未全面复核新增发行人财报、现金流与政策市场计价；保留PARTIAL。",
    "NYU新隐含ERP所列国债利率与当前Treasury不同，暂不替换v5条件估值输入；未审听新播客。"
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
      "value": "4.59%",
      "observation_date": "2026-11-02",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "4.91%",
      "observation_date": "2026-11-02",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.62%",
      "observation_date": "2026-11-02",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "利差扩大；继续观察",
      "observation_date": "2026-10-30",
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
