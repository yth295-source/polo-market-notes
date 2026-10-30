export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261030T210404Z",
  "review_completed_at_utc": "2026-10-30T21:10:11.016537+00:00",
  "review_event_sha256": "454eb1b70342b4c9f7baeb811ba95ae5b1781fb3b59f60fcca4afbedc624fb6c",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 震荡与分化主情景。季度薪酬成本增速放缓、实际利率下降；盈利增长读数上升，但超预期幅度偏小，信用利差反弹。证据方向不一致，继续观察。",
  "scope": "本轮核对 BLS 官方 ECI 网页提取、财政部曲线、FRED信用及FactSet10/30盈利摘要；重读BEA与Fed原文。月末名单新文件已入库并生成待审草稿，尚无合格广度。",
  "limitations": [
    "ECI季度变化为季调，年度变化为未季调；私人部门薪酬同比略升，不能概括为全面降温或必然停止加息。",
    "BLS/DOL直连失败保留；ECI通过官方网页提取核验，初请复用10/29证据。",
    "信用观察10/29，早于ECI发布；日频利率变化不能识别单一宏观因果。",
    "FactSet60%已报，增长为实际与估计混合；不同财报进度的超预期率不能直接作同样本比较。季度盈利增长不等于CY2027 EPS上修。",
    "未全面复核新公司财报现金质量、能源或Fed问答。EPS421.65仍是10/16共识锚。",
    "月末成分股草稿尚待完整事件覆盖、身份与价格连续性验收；正式广度仍UNKNOWN。"
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
