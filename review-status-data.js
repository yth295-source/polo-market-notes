export const REVIEW_STATUS = {
  "forecast_id": "wf-20261021-v5",
  "review_id": "heartbeat-research-20261029T115445Z",
  "review_completed_at_utc": "2026-10-29T11:57:11.822265+00:00",
  "review_event_sha256": "dcf95eac907c957b4ec08be0db9e28915409df34a3c47b689e887d0a9b992783",
  "disposition": "WATCH",
  "evidence_health": "PARTIAL",
  "reviewer": "Polo’s market notes · research review",
  "summary": "维持 v5 震荡与分化主情景。10/28 Fed维持3.75%–4.00%；已核对利率、决议前信用及公开盈利摘要与上次一致。本次复核早于10/29美国08:30的GDP/PCE发布窗口，尚不包含这些新数据。年底加25bp仍是待验证的研究判断。",
  "scope": "复核既有Fed声明、财政部曲线、FRED信用、FactSet公开摘要与BEA日历；成功来源正文与上次相同（BEA仅页脚日期变化）。BLS/DOL本次直连失败，沿用原日期旧证据，未重新执行备用路线。",
  "limitations": [
    "本次未完整检查新公司财报、能源、Fed记者会问答或实时政策计价；不能据此认定这些领域没有变化。10/29 GDP/PCE发布窗口尚未到。",
    "Fed官方声明已收取；汇总列表未同步更新。发布会音频与问答、实施细节及实时政策概率未核验，不能把两位反对票解读为12月必然加息。",
    "FactSet Q3利润率14.9%是混合实际与估计；Q2的17.0%受部分公司估值收益影响，剔除公司的15.1%也不是全指数经常性利润率。不能据此上调EPS或目标价。",
    "新利润率原文未来季度范围与数字数量不一致，相关前瞻利润率未纳入判断，等待澄清。",
    "美债观察日10/28与信用10/27不同，信用观察早于今日Fed决议。信用只公开定性摘要。未核验实时政策概率或穷尽发行人财报与Fed发言。",
    "BLS/DOL本轮原文下载失败；初请19.4万为截至10/17当周、10/22发布的旧证据，不是本轮新发布；CPI、周薪及州就业亦复用旧证据。",
    "CY2027 EPS421.65仍为10/16旧锚；行业权重和纳指前瞻分母仍有缺口。广度须10/30收盘后验收；10月正式输入仍UNKNOWN。"
  ],
  "observations": [
    {
      "label": "2年期美债",
      "value": "4.67%",
      "observation_date": "2026-10-28",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期名义利率",
      "value": "5.05%",
      "observation_date": "2026-10-28",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "10年期实际利率",
      "value": "2.67%",
      "observation_date": "2026-10-28",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "source": "U.S. Treasury"
    },
    {
      "label": "信用资料复核",
      "value": "收窄至原基准以下；决议前观察",
      "observation_date": "2026-10-27",
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
    },
    {
      "label": "Fed目标区间",
      "value": "3.75%–4.00% · 维持",
      "observation_date": "2026-10-28决议；10比2",
      "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20261028a.htm",
      "source": "Federal Reserve"
    }
  ]
};
