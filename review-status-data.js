export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261104T131015Z",
  "review_completed_at_utc": "2026-11-04T14:14:09.168023+00:00",
  "review_event_sha256": "65ac93bf35587e35c788491a4d8b3d78e87d2597cee8d59ac52c183e3535dad3",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持v5震荡与分化主情景。九月名义贸易逆差略收窄，但实际商品逆差扩大，须区分价格、黄金调整和统计口径；盈利结构变化继续观察。",
  "scope": "25个例行请求中17个成功、8个失败；另收取并阅读BEA九月贸易原文。15个成功页面正文与上次一致，BEA新闻与日历新增贸易发布。旧观察按原日期复用，发行人盈利对账和广度验收仍未完成。",
  "limitations": [
    "BLS及DOL直连失败，相关已公布读数复用旧证据；不能声称本轮重新核验全部发布。",
    "已收取价格文件覆盖10/30，但名单完整覆盖、证券身份与价格连续性尚未验收，正式广度仍UNKNOWN。",
    "未全面复核新增发行人财报、现金流与政策市场计价；保留PARTIAL。",
    "NYU新隐含ERP所列国债利率与当前Treasury不同，暂不替换v5条件估值输入；未审听新播客。",
    "FactSet新文日期为11月3日，但仍将Apple的11月2日报告列为未来安排；报告覆盖时点待核对。Mag7与其余公司增长比较受非经营损益、诉讼及基期影响，不能直接解释为经常性盈利趋势反转。",
    "本轮Fed新闻发布列表及BEA PCE直接请求亦失败，复用上次合格证据；不能据此声称所有来源均无更新。"
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
      "value": "4.61%",
      "observation_date": "2026-11-03",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "4.95%",
      "observation_date": "2026-11-03",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.65%",
      "observation_date": "2026-11-03",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202611&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "小幅收窄，仍高于签发基准",
      "observation_date": "2026-11-02",
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
    },
    {
      "label": "盈利结构复核",
      "value": "Mag7与其余公司差异待GAAP及进度对账",
      "observation_date": "FactSet 2026-11-03；Q3混合口径",
      "source": "FactSet",
      "url": "https://insight.factset.com/mag-7-now-reporting-lower-earnings-growth-than-the-other-493-sp-500-companies-for-q3"
    },
    {
      "label": "9月贸易",
      "value": "名义逆差略收窄；实际商品逆差扩大",
      "observation_date": "2026-09；11/04发布",
      "source": "BEA",
      "url": "https://www.bea.gov/news/2026/us-international-trade-goods-and-services-september-2026"
    }
  ]
};
