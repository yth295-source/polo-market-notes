export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261027T120152Z",
  "review_completed_at_utc": "2026-10-27T12:03:00.907824+00:00",
  "review_event_sha256": "1e53c88fb470b09d8df6e6c92cd928eb2f46280833f1fa250e5fde290b6f3d8f",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 震荡与分化主情景。本轮成功核对的利率、信用及盈利摘要与上一轮一致；信用仍高于原基准，利润率支持盈利韧性，但盈利质量与行业分化仍需观察。缺失来源不视为已证明没有变化。",
  "scope": "本轮晚醒，全部按实际UTC收取时间留存，跨UTC午夜不回记。核对10/26美债、10/23信用观察、已于上一轮收取的FactSet10/26利润率摘要及Fed、BEA列表。BLS/DOL原文403，明确复用此前官方摘录；未开展新的备用核验。原签发日期、期限和基准保留。",
  "limitations": [
    "FactSet Q3利润率14.9%是混合实际与估计；Q2的17.0%受部分公司估值收益影响，剔除公司的15.1%也不是全指数经常性利润率。不能据此上调EPS或目标价。",
    "新利润率原文未来季度范围与数字数量不一致，相关前瞻利润率未纳入判断，等待澄清。",
    "美债观察日10/26与信用10/23不同。信用只公开定性摘要。未核验实时政策概率或穷尽发行人财报与Fed发言。",
    "BLS/DOL本轮原文下载失败；初请19.4万为截至10/17当周、10/22发布的旧证据，不是本轮新发布；CPI、周薪及州就业亦复用旧证据。",
    "CY2027 EPS421.65仍为10/16旧锚；行业权重和纳指前瞻分母仍有缺口。广度须10/30收盘后验收；10月正式输入仍UNKNOWN。"
  ],
  "observations": [
    {
      "label": "2年期美债",
      "value": "4.68%",
      "observation_date": "2026-10-26",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "5.00%",
      "observation_date": "2026-10-26",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.66%",
      "observation_date": "2026-10-26",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "略收窄，仍高于原基准",
      "observation_date": "2026-10-23",
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
