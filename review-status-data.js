export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261103T215622Z",
  "review_completed_at_utc": "2026-11-03T21:58:49.840322+00:00",
  "review_event_sha256": "0225d81413eecdedfde020c4f9db7c51ad9773b882294b18aa9b6abdcd5489d5",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持v5震荡与分化主情景，继续观察盈利结构变化。新报告中的大型科技与其余公司增长差异受GAAP项目和报告进度影响，尚需发行人利润与现金流对账。",
  "scope": "本次24个例行来源请求中18个成功、6个BLS／DOL失败；另收取并阅读11月3日FactSet盈利文章。核对11月3日国债、11月2日信用及新盈利比较；其余已核验旧证据按观察日期复用。未完成发行人Q3逐项对账、实时政策计价、能源和广度验收。",
  "limitations": [
    "BLS及DOL直连失败，相关已公布读数复用旧证据；不能声称本轮重新核验全部发布。",
    "已收取价格文件覆盖10/30，但名单完整覆盖、证券身份与价格连续性尚未验收，正式广度仍UNKNOWN。",
    "未全面复核新增发行人财报、现金流与政策市场计价；保留PARTIAL。",
    "NYU新隐含ERP所列国债利率与当前Treasury不同，暂不替换v5条件估值输入；未审听新播客。",
    "FactSet新文日期为11月3日，但仍将Apple的11月2日报告列为未来安排；报告覆盖时点待核对。Mag7与其余公司增长比较受非经营损益、诉讼及基期影响，不能直接解释为经常性盈利趋势反转。"
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
    }
  ]
};
