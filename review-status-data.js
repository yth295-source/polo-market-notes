export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261028T115940Z",
  "review_completed_at_utc": "2026-10-28T12:01:09.088017+00:00",
  "review_event_sha256": "9753d21787b0b9db2d1013ea6ced447829d103765bbade7afd52bc553fa345e8",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 震荡与分化主情景。本轮成功核对的利率、信用及盈利读数与上一轮一致。此前信用压力缓和仍是最新可用观察，不算新增一天的确认；等待Fed决议与后续通胀、盈利证据。",
  "scope": "本轮晚醒，全部按实际UTC收取时间留存，跨UTC午夜不回记。核对10/27美债、10/26信用观察、已于上一轮收取的FactSet10/26利润率摘要及Fed、BEA列表。BLS/DOL原文403，明确复用此前官方摘录；未开展新的备用核验。原签发日期、期限和基准保留。",
  "limitations": [
    "FactSet Q3利润率14.9%是混合实际与估计；Q2的17.0%受部分公司估值收益影响，剔除公司的15.1%也不是全指数经常性利润率。不能据此上调EPS或目标价。",
    "新利润率原文未来季度范围与数字数量不一致，相关前瞻利润率未纳入判断，等待澄清。",
    "美债观察日10/27与信用10/26不同。信用只公开定性摘要。未核验实时政策概率或穷尽发行人财报与Fed发言。",
    "BLS/DOL本轮原文下载失败；初请19.4万为截至10/17当周、10/22发布的旧证据，不是本轮新发布；CPI、周薪及州就业亦复用旧证据。",
    "CY2027 EPS421.65仍为10/16旧锚；行业权重和纳指前瞻分母仍有缺口。广度须10/30收盘后验收；10月正式输入仍UNKNOWN。"
  ],
  "observations": [
    {
      "label": "2年期美债",
      "value": "4.70%",
      "observation_date": "2026-10-27",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "4.99%",
      "observation_date": "2026-10-27",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.64%",
      "observation_date": "2026-10-27",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "继续收窄，压力有所缓和",
      "observation_date": "2026-10-26",
      "url": "https://fred.stlouisfed.org/series/BAMLH0A0HYM2",
      "source": "FRED／ICE"
    },
    {
      "label": "标普Q3混合盈利增长",
      "value": "29.5%",
      "observation_date": "10/23摘要；24%公司已报",
      "url": "https://insight.factset.com/sp-500-earnings-season-update-october-23-2026",
      "source": "FactSet"
    },
    {
      "label": "初请失业金",
      "value": "19.4万",
      "observation_date": "截至2026-10-17当周；10/22发布",
      "url": "https://www.dol.gov/ui/data.pdf",
      "source": "U.S. DOL"
    },
    {
      "label": "标普Q3混合净利润率",
      "value": "14.9%",
      "observation_date": "2026-Q3；10/26摘要，含未报估计",
      "url": "https://insight.factset.com/sp-500-reporting-second-highest-net-profit-margin-in-more-than-15-years-for-q3-2026",
      "source": "FactSet"
    }
  ]
};
