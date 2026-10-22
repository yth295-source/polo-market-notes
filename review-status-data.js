export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261022T211046Z",
  "review_completed_at_utc": "2026-10-22T22:20:24.141028+00:00",
  "review_event_sha256": "dcb5e9a252f676419e4c9f4159c6285b9d5f904fdd99c7deec668a3283c4a878",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 的震荡与分化主情景。10/22美债收益率明显回落，最新已核验信用利差收窄，折现率压力暂缓。新一期初请下降、续请上升，仍需区分低裁员与招聘韧性；单日利率变化不足以改写Fed路径或年底市场判断。",
  "scope": "本轮晚醒，按10/22实际收取时间留存；先完成正式采集，再核对官方利率、信用、10/22初请、已发布CPI/PCE与周薪及Fed/FactSet列表。旧季度和月度发布重读不算新数据；原观点日期与固定窗口保留。",
  "limitations": [
    "10/22初请19.4万，较修订后的上周20万减少0.6万；上周原报19.9万已修订。续请为截至10/10当周172.8万，较修订后的上周增加2.5万；两项观察周不同。",
    "没有将美债回落归因于某一数据，也没有由收益率反推实时加息概率。信用资料仅公开定性摘要和来源链接。",
    "部分BLS/DOL原文下载403，指定发布通过官方页面提取核对；州就业及部分日历复用旧证据。未穷尽公司新财报与全部Fed发言。",
    "行业盈利权重、纳指前瞻分母仍有缺口；10月末广度须10/30收盘后验收。10月正式月度输入尚缺，保持UNKNOWN。"
  ],
  "observations": [
    {
      "label": "2年期美债",
      "value": "4.65%",
      "observation_date": "2026-10-22",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "4.96%",
      "observation_date": "2026-10-22",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.64%",
      "observation_date": "2026-10-22",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "利差收窄 · 继续观察",
      "observation_date": "2026-10-21",
      "url": "https://fred.stlouisfed.org/series/BAMLH0A0HYM2",
      "source": "FRED／ICE"
    },
    {
      "label": "初请失业金",
      "value": "19.4万",
      "observation_date": "截至2026-10-17当周；10/22发布",
      "url": "https://www.dol.gov/ui/data.pdf",
      "source": "U.S. DOL"
    }
  ]
};
