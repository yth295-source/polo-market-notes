export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261025T205518Z",
  "review_completed_at_utc": "2026-10-25T20:56:41.710305+00:00",
  "review_event_sha256": "b486fab8ae961419eff04368062c7c1114da9faebc1a2325734440591068ca04",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 的震荡与分化主情景。本轮成功核对的利率、信用与FactSet盈利摘要均与上一轮一致：此前利差扩大仍需观察，盈利支撑尚在，但仅24%的已报覆盖不足以确认全面改善。未取得新发布的项目明确复用旧证据。",
  "scope": "本轮晚醒，按10/25实际收取时间留存；先完成正式采集，再核对利率、信用、PCE、Fed列表及FactSet10/23摘要。BLS与DOL原文请求失败，CPI、周薪及初请明确复用上一轮已核验证据，本轮没有新备用核验。旧季度和月度发布重读不算新数据；原观点日期与固定窗口保留。",
  "limitations": [
    "10/22初请19.4万，较修订后的上周20万减少0.6万；上周原报19.9万已修订。续请为截至10/10当周172.8万，较修订后的上周增加2.5万；两项观察周不同。",
    "没有将美债回落归因于某一数据，也没有由收益率反推实时加息概率。信用资料仅公开定性摘要和来源链接。",
    "本轮BLS/DOL原文下载403，CPI、周薪、初请及州就业复用上一轮证据，不标成本轮新核验；部分日历亦复用。未穷尽公司新财报与全部Fed发言。",
    "10/23美债与10/22信用观察日不同。FactSet盈利29.5%与收入12.7%为已报实际加未报估计；覆盖变化不能当成同一组公司盈利修订，18.7倍是供应商前瞻倍数而非年底合理PE。CY2027 EPS421.65仍是10/16旧锚，本轮未核验新年度值。",
    "行业盈利权重、纳指前瞻分母仍有缺口；10月末广度须10/30收盘后验收。10月正式月度输入尚缺，保持UNKNOWN；BAA/AAA/FII10本轮均成功收取；旧失败记录继续保留。"
  ],
  "observations": [
    {
      "label": "2年期美债",
      "value": "4.69%",
      "observation_date": "2026-10-23",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "5.00%",
      "observation_date": "2026-10-23",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.66%",
      "observation_date": "2026-10-23",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "利差扩大 · 保持警觉",
      "observation_date": "2026-10-22",
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
    }
  ]
};
