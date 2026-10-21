// Financial review snapshot. Actual dates and UNKNOWN retained; not a live ledger.
export const DATA = {
  "snapshot": {
    "asOf": "2026-10-18",
    "asOfLabel": "2026 年 10 月 18 日 · 金融复核快照",
    "horizon": "未来 1–6 个月 · 波段与资产配置",
    "title": "能源推高通胀，政策与盈利等待下一轮验证",
    "thesis": "通胀压力已有证据，持续扩散仍待确认；政策刚向收紧方向调整，股票还需要盈利和信用共同验证。",
    "summary": "9月CPI较强，8月核心PCE动量较温和，两者观察期不同。9月Fed加息，但这不能推出10月必再加息或当前已强限制性。本周实际利率下行、标普仍跌；盈利兑现与风险补偿比单一利率解释更值得追踪。"
  },
  "metrics": [
    {
      "id": "cpi-headline-yoy",
      "label": "整体 CPI 同比",
      "value": "3.7",
      "unit": "%",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-14",
      "frequency": "每月",
      "change": "同月季调环比 +0.6%",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "bls-cpi"
      ],
      "note": "同比使用非季调指数。汽油解释超过一半的当月季调涨幅；同比与月环比描述不同时间窗口。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "sp500-week",
      "label": "标普 500 当周表现",
      "value": "−1.95",
      "unit": "%",
      "period": "2026-10-09 至 2026-10-16 美国收盘",
      "releasedAt": "2026-10-16",
      "frequency": "每周快照",
      "change": "10/16 收于 7,659.44 点",
      "changeTone": "warning",
      "topic": "stocks",
      "sourceIds": [
        "fred-sp500"
      ],
      "note": "价格指数周回报：100 × (7,659.44 ÷ 7,811.54 − 1) = −1.9471%；观察端点2026-10-16与10-09，不含分红。FRED当前版本核对，非当时收取凭证。",
      "verificationStatus": "VERIFIED_PRIMARY_AND_RECALCULATED",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "cpi-headline",
      "label": "整体 CPI 月环比",
      "value": "0.6",
      "unit": "%",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-14",
      "frequency": "每月",
      "change": "同比 3.7%",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "bls-cpi"
      ],
      "note": "汽油解释超过一半的整体月度涨幅。环比采用季调口径，同比采用非季调口径。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "cpi-core",
      "label": "核心 CPI 月环比",
      "value": "0.3",
      "unit": "%",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-14",
      "frequency": "每月",
      "change": "同比 2.6%",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "bls-cpi"
      ],
      "note": "剔除食品与能源。近期核心动量高于同比显示的速度，仍需细项广度验证。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "cpi-core-3m",
      "label": "核心 CPI 三个月年化",
      "value": "3.41",
      "unit": "%",
      "period": "截至 2026 年 9 月的三个月",
      "releasedAt": "2026-10-14",
      "frequency": "随月度数据重算",
      "change": "近期速度高于同比",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "cpi-series"
      ],
      "note": "同一次读取的季调指数：100 × [(338.896 ÷ 336.065)^4 − 1] = 3.4124%，四舍五入为3.41%。观察端点2026-09与2026-06；不是未来预测。",
      "verificationStatus": "VERIFIED_PRIMARY_AND_RECALCULATED",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "pce-core",
      "label": "核心 PCE 月环比",
      "value": "0.2",
      "unit": "%",
      "period": "2026 年 8 月",
      "releasedAt": "2026-09-30",
      "frequency": "每月",
      "change": "同比 3.0%",
      "changeTone": "neutral",
      "topic": "inflation",
      "sourceIds": [
        "bea-pce"
      ],
      "note": "比最新 CPI 落后一个月。Fed 的长期目标针对整体 PCE；核心 PCE 用于观察趋势。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "pce-core-3m",
      "label": "核心 PCE 三个月年化",
      "value": "2.05",
      "unit": "%",
      "period": "截至 2026 年 8 月的三个月",
      "releasedAt": "2026-09-30",
      "frequency": "随月度数据重算",
      "change": "8 月前的近期趋势较温和",
      "changeTone": "positive",
      "topic": "inflation",
      "sourceIds": [
        "pce-series",
        "bea-pce"
      ],
      "note": "同一次读取、年度更新后的季调指数：100 × [(130.455 ÷ 129.796)^4 − 1] = 2.0464%，四舍五入为2.05%。观察端点2026-08与2026-05；9月尚未公布。",
      "verificationStatus": "VERIFIED_PRIMARY_AND_RECALCULATED",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "cpi-gasoline",
      "label": "CPI 汽油月环比",
      "value": "9.1",
      "unit": "%",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-14",
      "frequency": "每月",
      "change": "整体 CPI 上涨的主要来源",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "bls-cpi"
      ],
      "note": "这是一项零售价格变化，不能等同于原油涨幅；也不能据此直接判断长期通胀。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "retail-gasoline",
      "label": "美国零售汽油 · 全品级",
      "value": "4.471",
      "unit": "美元 / 加仑",
      "period": "2026-10-12 当周",
      "releasedAt": "2026-10-14",
      "frequency": "每周",
      "change": "9/21 为 4.610 美元",
      "changeTone": "positive",
      "topic": "inflation",
      "sourceIds": [
        "eia-gas"
      ],
      "note": "EIA全品级、含税每加仑价格，10/12观察4.471，10/14发布；9/21为4.610。不要混用普通汽油4.331。周价不是完整月均，不能直接推算季调CPI。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "ppi-underlying",
      "label": "PPI 剔除食品、能源与贸易服务",
      "value": "0.5",
      "unit": "% 月环比",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-15",
      "frequency": "每月",
      "change": "整体 PPI 月环比 +1.3%",
      "changeTone": "warning",
      "topic": "inflation",
      "sourceIds": [
        "bls-ppi"
      ],
      "note": "生产者端最终需求售价压力值得观察；这不是纯投入成本指标。库存、需求与企业毛利会改变传导，不能把 PPI 等量映射成 CPI。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "fed-range",
      "label": "Fed 目标利率区间",
      "value": "3.75–4.00",
      "unit": "%",
      "period": "2026-09-16 决议后",
      "releasedAt": "2026-09-16",
      "frequency": "随政策决定更新",
      "change": "9 月加息 25bp",
      "changeTone": "warning",
      "topic": "fed",
      "sourceIds": [
        "fed-sep-decision"
      ],
      "note": "9/16声明宣布加息25bp，实施指令自9/17起。目标区间不同于实际隔夜利率、下一次会议概率或可观测中性利率；仅凭名义区间不能证明强限制性。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "fed-hike",
      "label": "9 月政策调整",
      "value": "+25",
      "unit": "bp",
      "period": "2026-09-16",
      "releasedAt": "2026-09-16",
      "frequency": "政策事件",
      "change": "纪要保留年内再加息条件",
      "changeTone": "warning",
      "topic": "fed",
      "sourceIds": [
        "fed-sep-decision",
        "fed-sep-minutes"
      ],
      "note": "9/16决议+25bp；10/7公布的9月纪要：多数参与者当时认为年内可能还需一次加息，但每次会议取决于新信息。不是10月必加息，也不是市场概率。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "payroll",
      "label": "非农就业新增",
      "value": "2.9",
      "unit": "万人",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-02",
      "frequency": "每月，可能修订",
      "change": "近三个月平均 5.1 万 / 月",
      "changeTone": "warning",
      "topic": "fed",
      "sourceIds": [
        "bls-jobs"
      ],
      "note": "招聘偏弱。需要与工时、失业率及裁员数据合看，单月就业不等同于衰退。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "unemployment",
      "label": "失业率",
      "value": "4.2",
      "unit": "%",
      "period": "2026 年 9 月",
      "releasedAt": "2026-10-02",
      "frequency": "每月",
      "change": "仍在近月区间内",
      "changeTone": "neutral",
      "topic": "fed",
      "sourceIds": [
        "bls-jobs"
      ],
      "note": "目前没有突然失速的确认。变化可能来自劳动供给，也可能来自需求，需要拆开分析。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "claims",
      "label": "初领失业救济",
      "value": "19.9",
      "unit": "万人",
      "period": "截至 2026-10-10 一周",
      "releasedAt": "2026-10-15",
      "frequency": "每周",
      "change": "四周均值 19.85 万",
      "changeTone": "positive",
      "topic": "fed",
      "sourceIds": [
        "dol-claims"
      ],
      "note": "没有广泛裁员激增的确认。周度数值易受季节与事件影响，持续变化比单周更重要。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "ust-2y",
      "label": "2 年期国债收益率",
      "value": "4.74",
      "unit": "%",
      "period": "2026-10-16 美国交易日",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "较 10/9 下降 6bp",
      "changeTone": "positive",
      "topic": "rates",
      "sourceIds": [
        "treasury-nominal"
      ],
      "note": "反映未来短率预期及风险补偿等因素，不能直接换算成每次 FOMC 的加息概率。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "ust-10y",
      "label": "10 年期国债收益率",
      "value": "5.09",
      "unit": "%",
      "period": "2026-10-16 美国交易日",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "较 10/9 下降 15bp",
      "changeTone": "positive",
      "topic": "rates",
      "sourceIds": [
        "treasury-nominal"
      ],
      "note": "水平仍高，最近一周变化则提供边际缓和。水平与变化应分别判断。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "real-10y",
      "label": "10 年期实际收益率",
      "value": "2.74",
      "unit": "%",
      "period": "2026-10-16 美国交易日",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "较 10/9 下降 17bp",
      "changeTone": "positive",
      "topic": "rates",
      "sourceIds": [
        "treasury-real"
      ],
      "note": "TIPS 实际收益率是长期实际贴现率代理。本周下跌不支持“实际利率上涨导致股票下跌”的解释。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "breakeven-10y",
      "label": "10 年期通胀补偿",
      "value": "2.35",
      "unit": "%",
      "period": "2026-10-16 美国交易日",
      "releasedAt": "2026-10-16",
      "frequency": "交易日，自算",
      "change": "较 10/9 上升 2bp",
      "changeTone": "neutral",
      "topic": "rates",
      "sourceIds": [
        "treasury-nominal",
        "treasury-real"
      ],
      "note": "同日Treasury名义10年5.09%减TIPS实际10年2.74%=2.35%。这是par-yield差的通胀补偿代理，含风险与流动性溢价，不能等同纯预期PCE通胀。",
      "verificationStatus": "VERIFIED_PRIMARY_AND_RECALCULATED",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "hy-spread",
      "label": "高收益债信用利差",
      "value": "323",
      "unit": "bp",
      "period": "2026-10-15",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "较 9/17 扩大 53bp",
      "changeTone": "warning",
      "topic": "rates",
      "sourceIds": [
        "fred-hy"
      ],
      "note": "ICE经FRED发布：10/15观察3.23%=323bp，10/16 08:59 CDT更新；9/17为2.70%，扩大53bp。不是10/16收盘值，不等于月度BAA−AAA规则。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "ig-spread",
      "label": "投资级债信用利差",
      "value": "84",
      "unit": "bp",
      "period": "2026-10-15",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "较 9/17 扩大 6bp",
      "changeTone": "warning",
      "topic": "rates",
      "sourceIds": [
        "fred-ig"
      ],
      "note": "ICE经FRED发布：10/15观察0.84%=84bp，10/16 08:58 CDT更新；9/17为0.78%，扩大6bp。不是企业个别融资报价或10/16收盘值。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "sp500",
      "label": "标普 500",
      "value": "7,659.44",
      "unit": "点",
      "period": "2026-10-16 收盘",
      "releasedAt": "2026-10-16",
      "frequency": "交易日",
      "change": "当周约 −1.95%",
      "changeTone": "warning",
      "topic": "stocks",
      "sourceIds": [
        "fred-sp500"
      ],
      "note": "价格指数收盘，不含分红再投资。这个静态原型没有填充未经核验的每日行情序列。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "nasdaq-week",
      "label": "纳斯达克当周表现",
      "value": "UNKNOWN",
      "unit": "",
      "period": "截至 2026-10-16 的一周",
      "releasedAt": "UNKNOWN",
      "frequency": "每周快照",
      "change": "10/16 一手终点未核验",
      "changeTone": "neutral",
      "topic": "stocks",
      "sourceIds": [
        "fred-nasdaq",
        "nasdaq-giw-candidate"
      ],
      "note": "FRED 的纳斯达克综合指数收盘序列目前到 2026-10-15（26,713.030）。Nasdaq GIW 已显示 10/16 候选 Last 26,140.03，但本轮未确认其最终历史收盘状态与准确发布时间，完整周回报仍为 UNKNOWN；不使用 Nasdaq-100 替代。",
      "verificationStatus": "UNKNOWN_PRIMARY_END_DATE_UNAVAILABLE",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "dow-week",
      "label": "道指当周表现",
      "value": "+0.67",
      "unit": "%",
      "period": "2026-10-09 至 2026-10-16 美国收盘",
      "releasedAt": "2026-10-16",
      "frequency": "每周快照",
      "change": "当周标普 −1.95%，道指 +0.67%",
      "changeTone": "positive",
      "topic": "stocks",
      "sourceIds": [
        "fred-djia"
      ],
      "note": "S&P DJI经FRED发布的价格指数：100 × (52,002.41 ÷ 51,654.95 − 1) = +0.6727%。不含分红；不同指数构成不能代替全市场广度。",
      "verificationStatus": "VERIFIED_PRIMARY_AND_RECALCULATED",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "forward-pe",
      "label": "标普 500 未来十二个月 P/E",
      "value": "19.0",
      "unit": "倍",
      "period": "2026-10-16 FactSet 快照",
      "releasedAt": "2026-10-16",
      "frequency": "每周，分母随预期变化",
      "change": "十年平均 19.1 倍",
      "changeTone": "neutral",
      "topic": "stocks",
      "sourceIds": [
        "factset"
      ],
      "note": "FactSet 10/16未来12个月预测P/E为19.0倍；10年均值19.1。预测盈利分母可能修订；不能由“接近均值”推出便宜，亦不能拿预测E/P−国债收益率当纯股票风险溢价。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    },
    {
      "id": "earnings-growth",
      "label": "第三季度混合盈利增长",
      "value": "29.0",
      "unit": "% 同比",
      "period": "2026Q3，截至 2026-10-16",
      "releasedAt": "2026-10-16",
      "frequency": "财报季每周",
      "change": "仅 9% 公司已公布",
      "changeTone": "neutral",
      "topic": "stocks",
      "sourceIds": [
        "factset"
      ],
      "note": "FactSet 10/16混合同比29.0%，只有9%公司已报，其余仍为预测；前周29.4%，季末29.2%。早期样本超预期幅度2.6%与全部公司历史平均7.5%并非同一披露进度样本。公开周报不是历史个股盈利修订数据库。",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00"
    }
  ],
  "topics": [
    {
      "id": "inflation",
      "title": "通胀",
      "kicker": "压力来自哪里？",
      "status": "能源冲击已发生，扩散待验证",
      "statusTone": "warning",
      "summary": "9 月 CPI 的明显上涨由汽油主导。核心 CPI 近期速度也偏高，但最新核心 PCE 只到 8 月，仍较温和；两者还没有确认同一个转折。",
      "logic": [
        "能源先进入汽油与运输成本，再通过企业利润和定价决定是否扩散。",
        "若上涨持续扩散到核心商品与服务，Fed 对通胀持续性的担忧会增加。",
        "若汽油回落、核心动量温和且长期预期稳定，更像局部冲击。"
      ],
      "confirmation": [
        "9 月及后续核心 PCE 动量抬升，多个分项共同加速。",
        "上游成本进入更多零售价，企业提价与核心广度相互确认。",
        "长期通胀预期持续上升，而非只有一年期预期跟随油价。"
      ],
      "falsification": [
        "零售汽油持续回落，随后能源对 CPI 的推动明显减弱。",
        "连续后续发布中核心 PCE 仍温和，核心上涨集中在少数可逆项目。",
        "生产率继续抵消工资增长，长期预期维持稳定。"
      ],
      "caveats": [
        "核心 CPI 的观察期为 9 月，核心 PCE 为 8 月，不能视为同期共同确认。",
        "三个月年化有噪声且会修订；CPI、PCE 与模型共享数据，不是彼此独立的多票确认。",
        "第二季度单位劳动成本同比 1.4%，对工资推升通胀构成反证，但数据滞后。",
        "9 月一年期家庭通胀预期 3.9%，五年期 3.0%；短期警戒增加，长期脱锚未确认。"
      ],
      "metricIds": [
        "cpi-headline-yoy",
        "cpi-headline",
        "cpi-core",
        "cpi-core-3m",
        "pce-core",
        "pce-core-3m",
        "cpi-gasoline",
        "retail-gasoline",
        "ppi-underlying"
      ],
      "sourceIds": [
        "bls-cpi",
        "cpi-series",
        "bea-pce",
        "pce-series",
        "bls-ppi",
        "eia-gas",
        "bls-productivity",
        "nyfed-sce"
      ]
    },
    {
      "id": "fed",
      "title": "Fed",
      "kicker": "加息之后，下一步看什么？",
      "status": "已向收紧方向调整，下一步仍有条件",
      "statusTone": "warning",
      "summary": "9月决议上调25bp，不能据此断言10月必然再加息或政策已强限制性。招聘偏弱、裁员仍低，后续通胀与就业决定政策条件是否改变。",
      "logic": [
        "Fed 权衡通胀、就业及两侧风险；同样的低通胀，若伴随需求崩落，会得到不同政策含义。",
        "通胀动量上升且就业尚稳，会增加维持偏紧或继续小幅收紧的条件基础。",
        "若招聘疲弱转为持续裁员、实际需求下滑，政策判断需要重新评估。"
      ],
      "confirmation": [
        "核心通胀继续偏强，而失业率和初领仍没有持续恶化。",
        "后续声明与沟通继续强调通胀持续性，保留收紧条件。"
      ],
      "falsification": [
        "能源回落、核心通胀持续降温，使额外收紧的必要性减弱。",
        "工时、招聘、消费同步转弱，初领和失业率持续上升。",
        "Fed 明确改变政策条件或风险权重。"
      ],
      "caveats": [
        "9 月纪要描述的是当时条件判断，不保证未来决策。",
        "目标区间、实际隔夜利率与市场预期是不同概念。",
        "就业数据可能修订，单次疲弱非农或单周初领都不足以确认趋势。",
        "9月纪要中数位参与者认为政策不具限制性或仅轻度限制；中性利率不可直接观测，不能只凭名义区间判断限制程度。"
      ],
      "metricIds": [
        "fed-range",
        "fed-hike",
        "payroll",
        "unemployment",
        "claims"
      ],
      "sourceIds": [
        "fed-sep-decision",
        "fed-sep-minutes",
        "bls-jobs",
        "dol-claims"
      ]
    },
    {
      "id": "rates",
      "title": "利率",
      "kicker": "水平与变化要分开看",
      "status": "贴现门槛高，本周边际缓和",
      "statusTone": "neutral",
      "summary": "10 年期名义与实际收益率的水平仍高，但最近一周分别下降 15bp、17bp。较弱信用利差约一个月持续扩大，说明国债缓和不等于企业融资全面改善。",
      "logic": [
        "长期名义收益率包含未来短率预期与期限补偿，不能直接读成一次会议的加息概率。",
        "名义收益率减实际收益率得到通胀补偿，其中还含风险和流动性因素。",
        "国债收益率下降若被信用利差扩大抵消，企业融资改善可能有限。"
      ],
      "confirmation": [
        "实际长率继续居高，或再次上升，估值门槛维持。",
        "HY 压力持续并扩散到 IG，企业绝对融资成本与融资可得性恶化。"
      ],
      "falsification": [
        "实际长率与企业融资成本同步持续下降。",
        "信用利差稳定并收窄，企业现金流和指引同步改善。"
      ],
      "caveats": [
        "国债变化窗口为 10/9–10/16，信用利差窗口为 9/17–10/15，不能直接比较涨跌幅大小。",
        "这里只展示已核验的三个利率观察点，不是完整每日时间序列。",
        "本快照没有使用期货或期权，因此不输出下一次会议概率。",
        "2.35% 是通胀补偿，不能解释成纯粹预期通胀，也不能与 PCE 2% 目标直接比较。"
      ],
      "metricIds": [
        "ust-2y",
        "ust-10y",
        "real-10y",
        "breakeven-10y",
        "hy-spread",
        "ig-spread"
      ],
      "sourceIds": [
        "treasury-nominal",
        "treasury-real",
        "treasury-sep-nominal",
        "treasury-sep-real",
        "fred-hy",
        "fred-ig"
      ]
    },
    {
      "id": "stocks",
      "title": "股票",
      "kicker": "盈利能否承受高门槛？",
      "status": "预期仍强，兑现是关键",
      "statusTone": "warning",
      "summary": "最近一周标普500下跌1.95%，道指上涨0.67%，说明指数表现分化，不能代替个股广度。Q3混合盈利增长29%，只有9%公司已报，股价所依赖的盈利分母仍待兑现。",
      "logic": [
        "股票同时受销量、售价、成本、融资负担与投资者要求回报影响。",
        "实际利率下降通常缓和贴现压力，但盈利下修或风险补偿上升仍可能压低价格。",
        "观察财报覆盖扩大后，盈利、利润率、指引与信用是否给出一致方向。"
      ],
      "confirmation": [
        "更多公司下调指引，毛利率和现金流承压，弱势跨行业扩散。",
        "盈利增长预测下调，同时信用利差继续扩大。"
      ],
      "falsification": [
        "财报覆盖扩大后，利润率、现金流和指引支持既有增长预期。",
        "信用止稳，市场上涨获得更多行业与公司参与。"
      ],
      "caveats": [
        "仅 9% 公司已公布财报，不能把 29% 混合盈利增长当成已实现结果。",
        "本周实际利率下降，不能用本周实际利率上升解释股票下跌。",
        "指数构成与权重不同；一周差异不足以确认轮动，完整广度仍待接入。",
        "P/E 分母是未来盈利预测，历史平均不等同于合理价值。",
        "纳斯达克综合指数10/16全周的一手终点尚未核验，本项记UNKNOWN；不使用Nasdaq-100替代。",
        "9%早期已报公司的超预期幅度，不能与全季所有公司的历史均值视作同进度严格比较。"
      ],
      "metricIds": [
        "sp500",
        "sp500-week",
        "nasdaq-week",
        "dow-week",
        "forward-pe",
        "earnings-growth"
      ],
      "sourceIds": [
        "fred-sp500",
        "factset",
        "fred-djia",
        "fred-nasdaq"
      ]
    }
  ],
  "alerts": [
    {
      "id": "cost-spread",
      "title": "价格压力会不会扩散？",
      "summary": "能源冲击已经发生；接下来要确认，更多核心分项是否跟进。",
      "status": "观察中 · 尚未确认持续再通胀",
      "evidence": "9 月 CPI +0.6%，汽油 +9.1%；剔除食品、能源和贸易服务的 PPI +0.5%。但 8 月核心 PCE 三个月年化约 2.05%。",
      "topic": "inflation",
      "confirmation": [
        "核心 PCE 近期动量持续抬升，并有更多分项参与。",
        "企业披露输入成本已传导到售价，长期预期也开始跟进。"
      ],
      "falsification": [
        "汽油月均回落，核心 PCE 和分项广度仍温和。",
        "工资成本被生产率或利润吸收，长期预期稳定。"
      ],
      "metricIds": [
        "cpi-headline",
        "cpi-gasoline",
        "ppi-underlying",
        "pce-core-3m",
        "retail-gasoline"
      ],
      "sourceIds": [
        "bls-cpi",
        "bls-ppi",
        "pce-series",
        "eia-gas"
      ]
    },
    {
      "id": "credit-pressure",
      "title": "弱信用先承压",
      "summary": "高收益债的风险补偿增加，需确认是否会向更广的融资条件扩散。",
      "status": "预警 · 尚非危机判断",
      "evidence": "9/17 至 10/15，HY 利差从 270bp 到 323bp；IG 从 78bp 到 84bp。国债收益率最近一周则有所下降。",
      "topic": "rates",
      "confirmation": [
        "HY 利差继续扩大，并扩散至 IG。",
        "企业融资成本、现金流、再融资披露和指引同步恶化。"
      ],
      "falsification": [
        "信用利差止稳收窄，融资可得性与企业现金流改善。"
      ],
      "metricIds": [
        "hy-spread",
        "ig-spread",
        "ust-10y"
      ],
      "sourceIds": [
        "fred-hy",
        "fred-ig",
        "treasury-nominal"
      ]
    },
    {
      "id": "earnings-test",
      "title": "高盈利预期进入兑现期",
      "summary": "当前价格依赖盈利韧性。现在要盯住预测，能否逐渐变成真实利润与现金流。",
      "status": "待验证 · 财报仍早",
      "evidence": "Q3混合盈利同比29%，仅9%公司已报；其余为预测。早期样本超预期幅度2.6%与五年全季平均7.5%覆盖不同，不能作严格同进度比较。",
      "topic": "stocks",
      "confirmation": [
        "财报覆盖增加后，增长预测和指引下调扩散。",
        "利润率和现金流走弱，信用继续承压。"
      ],
      "falsification": [
        "更多财报支持既有增长预期，利润率、现金流与指引稳健。",
        "信用止稳且市场参与度改善。"
      ],
      "metricIds": [
        "earnings-growth",
        "forward-pe",
        "hy-spread"
      ],
      "sourceIds": [
        "factset",
        "fred-hy"
      ]
    }
  ],
  "pricing": [
    {
      "id": "pricing-rates",
      "title": "较高利率门槛已体现在价格里",
      "summary": "融资与贴现成本仍高，但本周已有边际缓和。",
      "evidence": "2y 4.74%，10y 5.09%，10y 实际收益率 2.74%；后两者一周分别下降 15bp、17bp。",
      "limit": "不能由这些收益率换算出下一次会议概率，也无法给出“利空已计价百分比”。",
      "topic": "rates",
      "metricIds": [
        "ust-2y",
        "ust-10y",
        "real-10y"
      ],
      "sourceIds": [
        "treasury-nominal",
        "treasury-real"
      ]
    },
    {
      "id": "pricing-earnings",
      "title": "盈利韧性是重要定价假设",
      "summary": "未来盈利预测很强，接近历史平均的估值仍需要分母兑现。",
      "evidence": "未来十二个月 P/E 19.0 倍，十年均值 19.1 倍；第三季度混合盈利增长 29%，仅 9% 公司已报。",
      "limit": "分析师预测不等于已经实现，也不能证明每位投资者的预期相同；历史平均不保证便宜。",
      "topic": "stocks",
      "metricIds": [
        "forward-pe",
        "earnings-growth"
      ],
      "sourceIds": [
        "factset"
      ]
    },
    {
      "id": "pricing-risk",
      "title": "部分风险补偿增加，长期失控未获确认",
      "summary": "弱信用已有警觉，长期通胀补偿未同步大幅上冲。",
      "evidence": "HY 利差约一个月扩大 53bp；10y 通胀补偿 2.35%，最近一周仅上升 2bp。",
      "limit": "比较窗口不同；通胀补偿含风险与流动性成分。这些证据既不是危机确认，也不排除未来风险。",
      "topic": "rates",
      "metricIds": [
        "hy-spread",
        "ig-spread",
        "breakeven-10y"
      ],
      "sourceIds": [
        "fred-hy",
        "fred-ig",
        "treasury-nominal",
        "treasury-real"
      ]
    }
  ],
  "calendar": [
    {
      "id": "cal-fomc-oct",
      "at": "2026-10-29T02:00:00+08:00",
      "dateLabel": "10 月 29 日",
      "timeLabel": "02:00 · 台北，预计",
      "title": "FOMC 利率决议",
      "question": "继续收紧，还是等待更多通胀与就业证据？",
      "topic": "fed",
      "sourceIds": [
        "fed-calendar"
      ],
      "caution": "台北时间由美国例行 14:00 发布时间换算，实际以 Fed 公告为准。",
      "confirmation": "继续强调通胀持续性并保留收紧条件。",
      "falsification": "明确降低通胀担忧，或因就业风险改变政策条件。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-10-28T14:00:00-04:00",
      "timeStatus": "会议日期已核验；14:00为例行发布时间，实际公告优先"
    },
    {
      "id": "cal-pce-sep",
      "at": "2026-10-29T20:30:00+08:00",
      "dateLabel": "10 月 29 日",
      "timeLabel": "20:30 · 台北",
      "title": "9 月 PCE · 第三季度 GDP 初值",
      "question": "核心通胀是否跟随 CPI 转强，需求还有多少支撑？",
      "topic": "inflation",
      "sourceIds": [
        "bea-calendar"
      ],
      "caution": "PCE 与 GDP 初值可能修订；同时检查私人内需，避免把库存变化当作需求。",
      "confirmation": "核心动量和广度上升，实际需求仍稳。",
      "falsification": "核心仍温和；若需求同步恶化，应转向增长压力情景。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-10-29T08:30:00-04:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-eci",
      "at": "2026-10-30T20:30:00+08:00",
      "dateLabel": "10 月 30 日",
      "timeLabel": "20:30 · 台北",
      "title": "第三季度就业成本指数 ECI",
      "question": "工资与福利成本压力是否重新增强？",
      "topic": "inflation",
      "sourceIds": [
        "bls-oct-calendar"
      ],
      "caution": "ECI 与生产率的部门和口径不同，不能直接相除生成单位劳动成本。",
      "confirmation": "成本重新加速，并有服务价格与企业披露确认。",
      "falsification": "报酬趋势降温，或生产率持续抵消成本压力。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-10-30T08:30:00-04:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-productivity",
      "at": "2026-11-05T21:30:00+08:00",
      "dateLabel": "11 月 5 日",
      "timeLabel": "21:30 · 台北",
      "title": "第三季度生产率与单位劳动成本",
      "question": "产出效率能否继续抵消工资增长？",
      "topic": "inflation",
      "sourceIds": [
        "bls-nov-calendar"
      ],
      "caution": "初值可能大幅修订；使用同一部门的官方单位劳动成本口径。",
      "confirmation": "单位劳动成本重新加速，增加持续通胀疑虑。",
      "falsification": "生产率改善、单位劳动成本持续温和。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-11-05T08:30:00-05:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-jobs",
      "at": "2026-11-06T21:30:00+08:00",
      "dateLabel": "11 月 6 日",
      "timeLabel": "21:30 · 台北",
      "title": "10 月就业报告",
      "question": "招聘偏弱是否开始变成更广的就业恶化？",
      "topic": "fed",
      "sourceIds": [
        "bls-nov-calendar"
      ],
      "caution": "合看历史修订、工时、参与率与初领；不以单月非农定结论。",
      "confirmation": "招聘弱但失业和裁员仍稳定，偏紧政策条件尚存。",
      "falsification": "就业、工时与后续裁员同步恶化，迫使重新权衡增长风险。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-11-06T08:30:00-05:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-cpi",
      "at": "2026-11-10T21:30:00+08:00",
      "dateLabel": "11 月 10 日",
      "timeLabel": "21:30 · 台北",
      "title": "10 月 CPI",
      "question": "能源推动消退了吗，核心压力是否扩散？",
      "topic": "inflation",
      "sourceIds": [
        "bls-nov-calendar",
        "bls-cpi-gap"
      ],
      "caution": "2025 年 10 月部分基期数据缺失，部分同比将无法发布。优先看官方环比和可计算动量，不把填补值当官方同比。",
      "confirmation": "能源以外更多分项加速，核心动量持续抬升。",
      "falsification": "能源回落，核心动量和上涨广度同步趋缓。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-11-10T08:30:00-05:00",
      "timeStatus": "官方日历；缺2025年10月基期的序列不会公布同比"
    },
    {
      "id": "cal-ppi",
      "at": "2026-11-13T21:30:00+08:00",
      "dateLabel": "11 月 13 日",
      "timeLabel": "21:30 · 台北",
      "title": "10 月 PPI",
      "question": "生产者售价压力是否与消费端核心价格相互确认？",
      "topic": "inflation",
      "sourceIds": [
        "bls-nov-calendar"
      ],
      "caution": "PPI与CPI篮子不同；重点查与PCE相关分项及修订，不做等量传导假设。",
      "confirmation": "生产者端售价压力延续，并得到企业定价与后续 PCE 分项确认。",
      "falsification": "成本回落或被利润吸收，核心消费价格未跟随。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-11-13T08:30:00-05:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-pce-oct",
      "at": "2026-11-25T21:30:00+08:00",
      "dateLabel": "11 月 25 日",
      "timeLabel": "21:30 · 台北",
      "title": "10 月 PCE",
      "question": "通胀变化是一次波动，还是延续两个月的趋势？",
      "topic": "inflation",
      "sourceIds": [
        "bea-calendar"
      ],
      "caution": "计算三个月年化须使用同一版本指数，并复核前月修订。",
      "confirmation": "核心动量与广度连续偏强，使持续再通胀更可信。",
      "falsification": "后续核心仍温和，削弱进一步收紧的基础。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-11-25T08:30:00-05:00",
      "timeStatus": "官方日历"
    },
    {
      "id": "cal-fomc-dec",
      "at": "2026-12-10T03:00:00+08:00",
      "dateLabel": "12 月 10 日",
      "timeLabel": "03:00 · 台北，预计",
      "title": "FOMC · 经济预测 SEP",
      "question": "通胀、就业与政策路径的条件判断如何更新？",
      "topic": "fed",
      "sourceIds": [
        "fed-calendar"
      ],
      "caution": "由美国例行 14:00 发布时间换算，实际以公告为准。SEP 是个人条件预测，不能当作承诺。",
      "confirmation": "预测和沟通维持更紧条件，企业盈利仍能承受。",
      "falsification": "通胀或就业路径显著改变，原主情景应撤销或改写。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2026-12-09T14:00:00-05:00",
      "timeStatus": "会议日期已核验；发布时间为例行推定"
    },
    {
      "id": "cal-fomc-jan",
      "at": "2027-01-28T03:00:00+08:00",
      "dateLabel": "2027 年 1 月 28 日",
      "timeLabel": "03:00 · 台北，预计",
      "title": "FOMC 利率决议",
      "question": "过去三个月的通胀与就业证据，是否改变偏紧的政策条件？",
      "topic": "fed",
      "sourceIds": [
        "fed-calendar"
      ],
      "caution": "美国会议日期为 1 月 27 日；按例行 14:00 发布时间换算，实际以公告为准。",
      "confirmation": "核心通胀仍偏强、就业稳定，政策继续保留偏紧条件。",
      "falsification": "核心通胀持续降温，或就业与需求恶化使政策风险权重改变。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2027-01-27T14:00:00-05:00",
      "timeStatus": "官方会议日历暂定；发布时间为例行推定"
    },
    {
      "id": "cal-fomc-mar",
      "at": "2027-03-18T02:00:00+08:00",
      "dateLabel": "2027 年 3 月 18 日",
      "timeLabel": "02:00 · 台北，预计",
      "title": "FOMC · 经济预测 SEP",
      "question": "未来六个月的通胀、增长与政策路径，是否需要整体改写？",
      "topic": "fed",
      "sourceIds": [
        "fed-calendar"
      ],
      "caution": "美国会议日期为 3 月 17 日；按例行 14:00 发布时间及夏令时换算，实际以公告为准。SEP 是个人条件预测，不是承诺。",
      "confirmation": "更新后的预测与累计数据仍支持通胀反复、政策偏紧的主情景。",
      "falsification": "通胀持续温和且增长稳定，或就业、需求与盈利同步恶化，原主情景应撤销或改写。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "nyTime": "2027-03-17T14:00:00-04:00",
      "timeStatus": "官方会议日历暂定；发布时间为例行推定"
    }
  ],
  "sources": [
    {
      "id": "bls-cpi",
      "name": "9 月消费者价格报告",
      "publisher": "BLS",
      "url": "https://www.bls.gov/news.release/archives/cpi_10142026.htm",
      "observedThrough": "2026 年 9 月",
      "accessedAt": "2026-10-18",
      "note": "2026-10-14 发布；整体、核心与汽油。本轮重新核对官方页面。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION",
      "verifiedUrl": "https://www.bls.gov/news.release/archives/cpi_10142026.htm"
    },
    {
      "id": "cpi-series",
      "name": "核心 CPI 指数",
      "publisher": "BLS / FRED",
      "url": "https://fred.stlouisfed.org/data/CPILFESL",
      "observedThrough": "2026 年 9 月",
      "accessedAt": "2026-10-18",
      "note": "季调指数；用于三个月年化计算。外链可能展示更新版本。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bea-pce",
      "name": "8 月个人收入与支出",
      "publisher": "BEA",
      "url": "https://www.bea.gov/news/2026/personal-income-and-outlays-august-2026",
      "observedThrough": "2026 年 8 月",
      "accessedAt": "2026-10-18",
      "note": "2026-09-30 发布。包含年度及方法更新，须保留数据版本。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "pce-series",
      "name": "核心 PCE 价格指数",
      "publisher": "BEA / FRED",
      "url": "https://fred.stlouisfed.org/data/PCEPILFE",
      "observedThrough": "2026 年 8 月",
      "accessedAt": "2026-10-18",
      "note": "季调指数；三个月年化使用同一版本历史。外链可能更新。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-ppi",
      "name": "9 月生产者价格报告",
      "publisher": "BLS",
      "url": "https://www.bls.gov/news.release/archives/ppi_10152026.htm",
      "observedThrough": "2026 年 9 月",
      "accessedAt": "2026-10-18",
      "note": "2026-10-15 发布。PPI 不是 CPI 的等量先行映射。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "eia-gas",
      "name": "美国零售汽油周度价格",
      "publisher": "EIA",
      "url": "https://www.eia.gov/dnav/pet/pet_pri_gnd_a_epm0_pte_dpgal_w.htm",
      "observedThrough": "2026-10-12",
      "accessedAt": "2026-10-18",
      "note": "每加仑美元。9/21 与 10/12 为离散观察，不构成完整月均。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-productivity",
      "name": "生产率与单位劳动成本",
      "publisher": "BLS",
      "url": "https://www.bls.gov/news.release/archives/prod2_09032026.htm",
      "observedThrough": "2026 年第二季度",
      "accessedAt": "2026-10-18",
      "note": "2026-09-03 固定发布档案；第二季度非农商业单位劳动成本同比 1.4%，与季度年化 1.2% 口径不同。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "nyfed-sce",
      "name": "消费者预期调查",
      "publisher": "New York Fed",
      "url": "https://www.newyorkfed.org/newsevents/news/research/2026/20261007",
      "observedThrough": "2026 年 9 月",
      "accessedAt": "2026-10-18",
      "note": "一年期预期 3.9%，五年期 3.0%；调查预期有噪声。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fed-sep-decision",
      "name": "9 月 FOMC 政策声明",
      "publisher": "Federal Reserve",
      "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm",
      "observedThrough": "2026-09-16",
      "accessedAt": "2026-10-18",
      "note": "加息 25bp 至 3.75%–4.00%。官方政策决定。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fed-sep-minutes",
      "name": "9 月 FOMC 会议纪要",
      "publisher": "Federal Reserve",
      "url": "https://www.federalreserve.gov/monetarypolicy/files/fomcminutes20260916.pdf",
      "observedThrough": "2026-09-16 会议",
      "accessedAt": "2026-10-18",
      "note": "记录当时参与者的条件判断，也讨论 PCE 数据更新；不是未来承诺。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-jobs",
      "name": "9 月就业报告",
      "publisher": "BLS",
      "url": "https://www.bls.gov/news.release/archives/empsit_10022026.htm",
      "observedThrough": "2026 年 9 月",
      "accessedAt": "2026-10-18",
      "note": "2026-10-02 发布。非农、失业率和三个月平均。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "dol-claims",
      "name": "10 月 15 日失业救济报告",
      "publisher": "U.S. Department of Labor",
      "url": "https://www.dol.gov/sites/dolgov/files/OPA/newsreleases/ui-claims/20261599.pdf",
      "observedThrough": "截至 2026-10-10 一周",
      "accessedAt": "2026-10-18",
      "note": "初领及四周均值；周度数据可能修订。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "treasury-nominal",
      "name": "10 月国债名义收益率",
      "publisher": "U.S. Treasury",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_yield_curve",
      "observedThrough": "2026-10-16",
      "accessedAt": "2026-10-18",
      "note": "国债 par curve / CMT；本原型仅保留已核验观察。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "treasury-real",
      "name": "10 月国债实际收益率",
      "publisher": "U.S. Treasury",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202610&type=daily_treasury_real_yield_curve",
      "observedThrough": "2026-10-16",
      "accessedAt": "2026-10-18",
      "note": "TIPS 实际收益率；与同日名义收益率相减得到通胀补偿。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "treasury-sep-nominal",
      "name": "9 月国债名义收益率",
      "publisher": "U.S. Treasury",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_yield_curve",
      "observedThrough": "2026-09-16",
      "accessedAt": "2026-10-18",
      "note": "走势图 9 月 16 日观察点的名义收益率来源。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "treasury-sep-real",
      "name": "9 月国债实际收益率",
      "publisher": "U.S. Treasury",
      "url": "https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?field_tdr_date_value_month=202609&type=daily_treasury_real_yield_curve",
      "observedThrough": "2026-09-16",
      "accessedAt": "2026-10-18",
      "note": "走势图 9 月 16 日观察点的 TIPS 实际收益率来源。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fred-hy",
      "name": "美国高收益债 OAS",
      "publisher": "ICE BofA / FRED",
      "url": "https://fred.stlouisfed.org/data/BAMLH0A0HYM2",
      "observedThrough": "2026-10-15",
      "accessedAt": "2026-10-18",
      "note": "展示核验快照与来源链接；许可和历史长度受原提供商条款约束。未接入自动抓取或完整原始序列。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fred-ig",
      "name": "美国投资级债 OAS",
      "publisher": "ICE BofA / FRED",
      "url": "https://fred.stlouisfed.org/data/BAMLC0A0CM",
      "observedThrough": "2026-10-15",
      "accessedAt": "2026-10-18",
      "note": "展示核验快照与来源链接；使用及再分发遵守原提供商条款。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fred-sp500",
      "name": "标普 500 收盘指数",
      "publisher": "S&P Dow Jones Indices / FRED",
      "url": "https://fred.stlouisfed.org/series/SP500",
      "observedThrough": "2026-10-16",
      "accessedAt": "2026-10-18",
      "note": "价格指数，不含分红。只展示本次对话核验的收盘快照。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "factset",
      "name": "10 月 16 日盈利季快照",
      "publisher": "FactSet",
      "url": "https://insight.factset.com/sp-500-earnings-season-update-october-16-2026",
      "observedThrough": "2026-10-16",
      "accessedAt": "2026-10-18",
      "note": "混合盈利增长、已报比例、超预期幅度与估值。公开文章不代表完整共识数据库的开放许可。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fed-calendar",
      "name": "FOMC 会议日历",
      "publisher": "Federal Reserve",
      "url": "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
      "observedThrough": "2026–2027 年会议安排",
      "accessedAt": "2026-10-18",
      "note": "日历按官方日期与美国例行发布时间转换台北时间，实际时间以公告为准。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-oct-calendar",
      "name": "10 月数据发布日历",
      "publisher": "BLS",
      "url": "https://www.bls.gov/schedule/2026/10_sched.htm",
      "observedThrough": "2026 年 10 月安排",
      "accessedAt": "2026-10-18",
      "note": "ECI 等发布；日期可能调整。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-nov-calendar",
      "name": "11 月数据发布日历",
      "publisher": "BLS",
      "url": "https://www.bls.gov/schedule/2026/11_sched.htm",
      "observedThrough": "2026 年 11 月安排",
      "accessedAt": "2026-10-18",
      "note": "生产率、就业与 CPI；11 月台北时间已按美国冬令时换算。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bea-calendar",
      "name": "BEA 数据发布日历",
      "publisher": "BEA",
      "url": "https://www.bea.gov/news/schedule",
      "observedThrough": "2026 年已公布安排",
      "accessedAt": "2026-10-18",
      "note": "PCE 与 GDP；时间和日期实际以官方公告为准。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "bls-cpi-gap",
      "name": "2025 年政府停摆对 CPI 的影响",
      "publisher": "BLS",
      "url": "https://www.bls.gov/cpi/additional-resources/2025-federal-government-shutdown-impact-cpi-faq.htm",
      "observedThrough": "2025 年缺失基期及后续影响说明",
      "accessedAt": "2026-10-18",
      "note": "部分 2026 年 10 月同比无法发布；供应商填补不是官方统计值。",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationMethod": "manual inspection of source page using web tool on 2026-10-18",
      "verificationStatus": "VERIFIED_PRIMARY_OR_PROVIDER_DISTRIBUTION"
    },
    {
      "id": "fred-djia",
      "name": "道琼斯工业指数",
      "publisher": "S&P Dow Jones Indices / FRED",
      "url": "https://fred.stlouisfed.org/data/DJIA",
      "observedThrough": "2026-10-16",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationStatus": "VERIFIED_PROVIDER_DISTRIBUTION",
      "accessedAt": "2026-10-18",
      "note": "原提供商经 FRED 发布；观察期和本轮核验时间单列。"
    },
    {
      "id": "fred-nasdaq",
      "name": "纳斯达克综合指数",
      "publisher": "Nasdaq / FRED",
      "url": "https://fred.stlouisfed.org/series/NASDAQCOM",
      "observedThrough": "2026-10-15",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationStatus": "VERIFIED_WITH_END_DATE_GAP",
      "accessedAt": "2026-10-18",
      "note": "原提供商经 FRED 发布；观察期和本轮核验时间单列。"
    },
    {
      "id": "eia-release",
      "name": "汽油与柴油发布日",
      "publisher": "EIA",
      "url": "https://www.eia.gov/petroleum/gasdiesel/",
      "observedThrough": "2026-10-14发布、10/12观察",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationStatus": "VERIFIED_PRIMARY_MANUAL",
      "accessedAt": "2026-10-18",
      "note": "EIA 官方周度价格发布页面，用于核对发布日期与品级口径。"
    },
    {
      "id": "nasdaq-own-week",
      "name": "Nasdaq本周市场观察",
      "publisher": "Nasdaq Economic Institute",
      "url": "https://www.nasdaq.com/economic-institute/chartstopper-101626",
      "observedThrough": "2026-10-16",
      "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
      "verificationStatus": "VERIFIED_PROVIDER_COMMENTARY",
      "note": "Nasdaq 官方当周评论；其自身指数说明为原提供商材料，转述的 Fed 或其他机构观点不能替代原始公告。Nasdaq-100 不等于纳斯达克综合指数。",
      "accessedAt": "2026-10-18"
    },
    {
      "id": "nasdaq-giw-candidate",
      "name": "Nasdaq Composite 官方候选报价",
      "publisher": "Nasdaq GIW",
      "url": "https://indexes.nasdaq.com/Index/Overview/COMP",
      "observedThrough": "2026-10-16 · 候选 Last，最终收盘未确认",
      "accessedAt": "2026-10-18",
      "note": "已显示 Last 26,140.03；不能仅凭 Last 标签确认最终历史收盘或准确首次发布时间。周回报仍 UNKNOWN，不回填旧判断。",
      "verificationStatus": "PROVIDER_CANDIDATE_NOT_FINAL_CLOSE"
    }
  ],
  "qa": [
    {
      "title": "发布快照与前瞻账本分开",
      "text": "本轮于2026-10-18复核现况来源与算术：26项指标中25项可核验，纳指完整周回报为UNKNOWN。采集任务已设每天美东09:00与23:59，本页仍为发布快照；当前研究解释不写入11月正式判断。"
    },
    {
      "title": "先区分观察期，再比较",
      "text": "最新 CPI 为 9 月，PCE 为 8 月；国债变化是一周，信用变化约一个月。共享底层数据的指标，不重复算作独立证据。"
    },
    {
      "title": "预警需要后续验证",
      "text": "主情景是条件性研究判断，未转换成校准概率。高通胀、加息、长期利率与股价是分别可能失败的环节；政策收紧方向不等于政策水平已强限制性。"
    },
    {
      "title": "市场计价有解释边界",
      "text": "收益率、估值与信用利差提供价格证据，不能严谨换算为利空已计价百分比。通胀补偿也不是纯通胀预期。"
    },
    {
      "title": "广度研究的进展与边界",
      "text": "已接收授权历史价格与成分股数据，第三轮冻结结果已复核：TB与信用T相同，尚未证明个股广度的增量价值。所有已看过历史均为DEVELOPMENT。10月末前瞻名单仍待验收，正式广度UNKNOWN；未接入历史盈利修订。"
    },
    {
      "title": "保留修订与缺失",
      "text": "短期年化按同一版本指数计算；年度与方法更新可能影响比较。10 月 CPI 的部分同比存在缺失基期，后续必须标注。"
    },
    {
      "title": "最终独立 QA 与前瞻展示",
      "text": "2026-10-18 独立复核：12 项算术、11 项时区换算通过；修正 Nasdaq 候选报价说明、BLS 固定档案链接与 PPI 售价口径。前瞻页沿用冻结规则做条件推演，不把历史检验包装成已验证的收益预测。"
    }
  ],
  "charts": {
    "rates": [
      {
        "date": "09.16",
        "nominal": 5.01,
        "real": 2.68,
        "breakeven": 2.33
      },
      {
        "date": "10.09",
        "nominal": 5.24,
        "real": 2.91,
        "breakeven": 2.33
      },
      {
        "date": "10.16",
        "nominal": 5.09,
        "real": 2.74,
        "breakeven": 2.35
      }
    ]
  },
  "review": {
    "verifiedAt": "2026-10-18T07:55:47.486294+00:00",
    "checks": {
      "metricCount": 26,
      "verifiedMetricCount": 25,
      "unknownMetricCount": 1,
      "arithmeticChecks": 12,
      "calendarTimezoneChecks": 11,
      "historicalRulesReconciled": 8,
      "newFinancialBacktestsRun": 0,
      "formalProspectiveRecordsCreated": 0
    },
    "calculations": [
      {
        "id": "cpi-core-3m",
        "formula": "100*((I_m/I_m_minus_3)^4-1)",
        "operands": {
          "2026-09": 338.896,
          "2026-06": 336.065
        },
        "result": 3.4124037788220596,
        "display": "3.41%",
        "status": "PASS",
        "sourceIds": [
          "cpi-series"
        ]
      },
      {
        "id": "pce-core-3m",
        "formula": "100*((I_m/I_m_minus_3)^4-1)",
        "operands": {
          "2026-08": 130.455,
          "2026-05": 129.796
        },
        "result": 2.046398408308314,
        "display": "2.05%",
        "status": "PASS",
        "sourceIds": [
          "pce-series"
        ]
      },
      {
        "id": "sp500-week",
        "formula": "100*(close_2026_10_16/close_2026_10_09-1)",
        "operands": {
          "2026-10-16": 7659.44,
          "2026-10-09": 7811.54
        },
        "result": -1.947119262014918,
        "display": "−1.95%",
        "status": "PASS",
        "sourceIds": [
          "fred-sp500"
        ]
      },
      {
        "id": "dow-week",
        "formula": "100*(close_2026_10_16/close_2026_10_09-1)",
        "operands": {
          "2026-10-16": 52002.41,
          "2026-10-09": 51654.95
        },
        "result": 0.6726557667755095,
        "display": "+0.67%",
        "status": "PASS",
        "sourceIds": [
          "fred-djia"
        ]
      },
      {
        "id": "breakeven-10y",
        "formula": "nominal10y-real10y",
        "operands": {
          "nominal10y": 5.09,
          "real10y": 2.74
        },
        "result": 2.35,
        "display": "2.35%",
        "status": "PASS",
        "sourceIds": [
          "treasury-nominal",
          "treasury-real"
        ]
      },
      {
        "id": "weekly-real-change",
        "formula": "100*(real_10_16-real_10_09)",
        "operands": {
          "2026-10-16": 2.74,
          "2026-10-09": 2.91
        },
        "result": -17,
        "display": "−17bp",
        "status": "PASS",
        "sourceIds": [
          "treasury-real"
        ]
      },
      {
        "id": "weekly-nominal-change",
        "formula": "100*(nominal_10_16-nominal_10_09)",
        "operands": {
          "2026-10-16": 5.09,
          "2026-10-09": 5.24
        },
        "result": -15,
        "display": "−15bp",
        "status": "PASS",
        "sourceIds": [
          "treasury-nominal"
        ]
      },
      {
        "id": "weekly-2y-change",
        "formula": "100*(yield_10_16-yield_10_09)",
        "operands": {
          "2026-10-16": 4.74,
          "2026-10-09": 4.8
        },
        "result": -6,
        "display": "−6bp",
        "status": "PASS",
        "sourceIds": [
          "treasury-nominal"
        ]
      },
      {
        "id": "weekly-breakeven-change",
        "formula": "100*((nominal-real)_10_16-(nominal-real)_10_09)",
        "operands": {
          "2026-10-16": 2.35,
          "2026-10-09": 2.33
        },
        "result": 2,
        "display": "+2bp",
        "status": "PASS",
        "sourceIds": [
          "treasury-nominal",
          "treasury-real"
        ]
      },
      {
        "id": "hy-change",
        "formula": "100*(OAS_10_15-OAS_09_17)",
        "operands": {
          "2026-10-15": 3.23,
          "2026-09-17": 2.7
        },
        "result": 53,
        "display": "+53bp",
        "status": "PASS",
        "sourceIds": [
          "fred-hy"
        ]
      },
      {
        "id": "ig-change",
        "formula": "100*(OAS_10_15-OAS_09_17)",
        "operands": {
          "2026-10-15": 0.84,
          "2026-09-17": 0.78
        },
        "result": 6,
        "display": "+6bp",
        "status": "PASS",
        "sourceIds": [
          "fred-ig"
        ]
      },
      {
        "id": "payroll-three-month-average",
        "formula": "(July_revised+August_revised+September)/3",
        "operands": {
          "2026-07": -10000,
          "2026-08": 133000,
          "2026-09": 29000
        },
        "result": 50666.666666666664,
        "display": "约5.1万人/月",
        "status": "PASS",
        "sourceIds": [
          "bls-jobs"
        ]
      }
    ],
    "limits": [
      "本轮是现况来源与算术核验，不是新回归、回测或预测有效性证明。",
      "一手含数据原提供商及官方FRED分发，不表示所有市场数据均为公共领域或有无限再分发许可；只展示有限研究快照。",
      "25/26原有指标本轮核验或复算通过；纳斯达克综合指数完整10/16全周为UNKNOWN。来源核验完成时间不是原始发布时间。",
      "没有纳入未经许可的历史盈利修订数据；FactSet公开周报只作当前背景。",
      "正式前瞻账本尚无预测，不把当前研究解释回填为11月首期。10月末名单未验收，正式广度UNKNOWN。",
      "Fed9月纪要支持当时的条件性再加息倾向；不能替代10月新沟通，也不能推导某次会议的精确概率。",
      "市场已计价程度无法从这一组水平可靠压缩成百分比，股票下跌原因也未被因果识别。"
    ],
    "corrections": [
      {
        "id": "policy-restrictiveness",
        "severity": "material_interpretation",
        "action": "将强限制性/必再加息的暗示改为政策向收紧方向调整；9月纪要中数位参与者认为政策不具限制性或仅轻度限制。"
      },
      {
        "id": "nasdaq-week",
        "severity": "data_boundary",
        "action": "完整全周一手端点不足，设UNKNOWN；旧AP−4.5%不标作本轮一手核验。"
      },
      {
        "id": "factset-early-sample",
        "severity": "interpretation",
        "action": "保留仅9%已报；历史超预期均值覆盖全季公司，不能视作同期进度严格比较。"
      },
      {
        "id": "oas-date",
        "severity": "clock",
        "action": "10/15观察、10/16提供商更新分开；正式信用规则为月度BAA−AAA，不能混用HY OAS。"
      },
      {
        "id": "gasoline-grade",
        "severity": "definition",
        "action": "4.471为全品级含税价；普通汽油是4.331，不混口径。"
      }
    ],
    "mainCase": {
      "title": "能源推高通胀，政策与盈利等待下一轮验证",
      "thesis": "通胀压力已有证据，持续扩散仍待确认；政策刚向收紧方向调整，股票还需要盈利和信用共同验证。",
      "summary": "9月CPI较强，8月核心PCE动量较温和，两者观察期不同。9月Fed加息，但这不能推出10月必再加息或当前已强限制性。本周实际利率下行、标普仍跌；盈利兑现与风险补偿比单一利率解释更值得追踪。",
      "confidence": "条件性工作判断，未校准成概率",
      "notEstablished": [
        "没有验证出1–6个月崩盘概率",
        "没有证明当前政策强限制性",
        "没有一手完整期货截点，因此下次会议概率UNKNOWN",
        "没有截至10月末验收通过的个股广度锚点，因此正式B状态UNKNOWN"
      ],
      "confirmation": [
        "后续同一版本核心PCE动量与分项广度持续抬升",
        "信用利差扩大延续并扩散，企业指引或现金流同时走弱",
        "实际利率重新上升且需求/盈利未能抵消融资与贴现压力"
      ],
      "falsification": [
        "汽油完整月均回落，随后核心PCE动量和分项压力连续减弱",
        "实际利率和企业融资成本同步下降，信用收窄且财报支持盈利预期",
        "招聘弱化转为持续裁员、工时和实际需求一起下降时，应改写为增长压力情景，不能硬套再通胀主线"
      ]
    }
  }
};
