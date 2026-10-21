// Presentation of the sealed Stage 4 protocol. No observed inputs are inferred here.
export const ACTUAL_INPUTS = Object.freeze({ B: 'UNKNOWN', T: 'UNKNOWN', R: 'UNKNOWN' });
export const PROTOCOL_SHA = 'dcdf9dccd42fc4ac521f741b1514366640d301b545dba08e3ebe46f83486e71c';
const choices = ['UNKNOWN', 'TRUE', 'FALSE'];
const possibilities = v => v === 'UNKNOWN' ? [false, true] : [v === 'TRUE'];
const consensus = a => a.every(Boolean) ? 'TRUE' : a.every(x => !x) ? 'FALSE' : 'UNKNOWN';

export function evaluateOutlook(input) {
  for (const k of ['B', 'T', 'R']) if (!choices.includes(input[k])) throw new Error(`Invalid ${k} state`);
  const worlds = [];
  for (const B of possibilities(input.B)) for (const T of possibilities(input.T)) for (const R of possibilities(input.R)) {
    worlds.push({ h1: B ? (T ? 'CREDIT_CONFIRMED' : 'BREADTH_WATCH') : (T ? 'CREDIT_ONLY' : 'NO_ACTIVE_FLAG'),
      WATCH: B, CONFIRMED: B && T, CREDIT_ONLY: T && !B, BASE_ANY: B || T,
      RATE_WATCH: R, EXTENDED_ANY: B || T || R, INCREMENTAL_RATE: R && !(B || T), RATE_WHILE_CREDIT_QUIET: R && !T });
  }
  const signals = Object.fromEntries(['WATCH','CONFIRMED','CREDIT_ONLY','BASE_ANY','RATE_WATCH','EXTENDED_ANY','INCREMENTAL_RATE','RATE_WHILE_CREDIT_QUIET'].map(k => [k, consensus(worlds.map(w => w[k]))]));
  return { h1States: [...new Set(worlds.map(w => w.h1))], signals, possibleWorlds: worlds.length };
}

const stateLabels = { NO_ACTIVE_FLAG:'暂未触发广度／信用规则', BREADTH_WATCH:'广度观察', CREDIT_CONFIRMED:'广度 + 信用确认', CREDIT_ONLY:'信用单独预警' };
const stateReadings = {
  NO_ACTIVE_FLAG: '这两条规则暂未触发，不代表未来安全；突发冲击仍可能完全漏报。',
  BREADTH_WATCH: '上涨参与度偏弱。先保留观察，不要求信用同步恶化才看见这项信号。',
  CREDIT_CONFIRMED: '市场参与度与信用压力同时触发。优先复核风险，但历史没有证明这个 AND 组合更会预测。',
  CREDIT_ONLY: '信用压力已触发，即使广度未触发，也保留独立风险提示。'
};
const signalLabel = v => ({ TRUE:'触发', FALSE:'未触发', UNKNOWN:'UNKNOWN' })[v];
const status = v => `<span class="outlook-status ${v.toLowerCase()}">${signalLabel(v)}</span>`;

export function outlookResult(input, simulated = false) {
  const result = evaluateOutlook(input);
  const definite = result.h1States.length === 1;
  return `<div class="outlook-result-top"><span class="outlook-kicker">${simulated ? '假设输入 · 仅当前页面推演' : '实际快照 · 2026.10.18'}</span><span class="outlook-mode">${simulated ? 'SIMULATION' : 'AWAITING FIRST DECISION'}</span></div>
    <h3>${definite ? stateLabels[result.h1States[0]] : '信息还不够，保留可能的判断'}</h3>
    <p>${definite ? stateReadings[result.h1States[0]] : 'UNKNOWN 不能当作“未触发”。下面列出与输入相容的广度／信用状态；这些状态没有概率权重。'}</p>
    <div class="outlook-state-list">${result.h1States.map(s=>`<span>${stateLabels[s]}</span>`).join('')}</div>
    <div class="outlook-output-grid">${[['WATCH','广度观察','B'],['CREDIT_TRIGGER','信用触发','T'],['RATE_WATCH','实际利率通道','R'],['BASE_ANY','广度或信用','B ∨ T'],['EXTENDED_ANY','任一通道','B ∨ T ∨ R'],['INCREMENTAL_RATE','利率新增提示','R ∧ ¬(B ∨ T)']].map(([key,label,formula])=>`<div><span>${label}</span>${status(key === 'CREDIT_TRIGGER' ? input.T : result.signals[key])}<small>${formula}</small></div>`).join('')}</div>
    <p class="outlook-result-note">${result.signals.INCREMENTAL_RATE === 'TRUE' ? '在这个假设中，广度与信用均未提示，利率单独增加一项提示。是否增加预测价值，仍须未来样本验证。' : result.signals.RATE_WATCH === 'TRUE' && result.signals.BASE_ANY === 'TRUE' ? '利率也触发，但广度／信用已经提示；不能把它重复计算为新增预警。' : '规则只给出风险观察状态，不给出指数点位、收益率预测或暴跌概率。'}</p>
    <div class="outlook-result-foot">${simulated ? '假设推演不会写入判断账本，也不会改变实际快照。' : '首期截止：2026-11-06 09:25 EST／台北 22:25，按当前官方日历并须当天实际复核。截止不保证全部可判定；仍缺失、未验收或迟到的项目记录 UNKNOWN。'}</div>`;
}

const components = [
  { id:'B', name:'市场广度', subtitle:'上涨是否只靠少数股票？', formula:'站上 200 日均线的比例 < 50%', mechanism:'参与度偏弱，是股票市场内部的脆弱性提示；它本身不能证明经济衰退。', pending:'最早 10/30 美东 16:00 收盘后（台北 10/31 04:00）：收到必要新版本，并完成成分股、证券身份及 200 日价格验收后可计算。收盘时刻不等于数据已可用。', detail:'先核对月末真实成分、永久证券标识及多股类。使用 SEP 拆股调整、不含现金分红的 close；200 个官方交易日全部有效，当前成交量为正，标识连续。SMA200 是含月末当日的连续 200 个有效 close 的算术平均；当日 close 严格高于 SMA 才算站上。缺失个股仍保留在分母。', rule:'若确定成员 k 个、已知站上均线 b 个、无法分类 q 个、可能成员 u 个：下界 = b/(k+u)，上界 = (b+q+u)/(k+u)。上界 < 50% 才触发；下界 ≥ 50% 才不触发；其余 UNKNOWN。空或未验收名单一律 UNKNOWN。', reversal:'下一期有效读数下界 ≥ 50%，该期广度为未触发；跨越阈值但无法确定时为 UNKNOWN。每期重新判断，原记录不改写。', links:[['Sharadar 价格口径','https://sharadar.com/prices'],['S&P 指数公告','https://www.spglobal.com/spdji/en/index-announcements/']] },
  { id:'T', name:'信用压力', subtitle:'融资风险是否开始扩散？', formula:'月度信用利差，3 个月扩大 ≥ 25bp', mechanism:'低评级相对高评级融资成本上升，提示信用风险或风险补偿增加；不等于已经发生违约。', pending:'11 月初起检查：10 月 BAA、AAA 官方月度值公布、实际收取并核对口径后可计算，与已收到的 7 月值比较。确切可用日以实际发布与收取为准。', detail:'Sm = BAAm − AAAm；使用同一可用信息集的 Moody’s 月度收益率。比较 2026 年 10 月与 7 月，要求两个端点均在截点前收取且口径可比。', rule:'ΔS = Sm − Sm−3。按百分点计算，四舍五入到 10 位小数后 ≥ 0.25 为 TRUE，否则 FALSE；任何依赖缺失或不可比为 UNKNOWN。日度 HY OAS 仅作背景。', reversal:'下一期可比月度 ΔS < 25bp，该期信用为未触发；每期重新判断，原记录不改写。这只表示利差变化未达阈值，不表示信用水平便宜。', links:[['FRED · BAA','https://fred.stlouisfed.org/series/BAA'],['FRED · AAA','https://fred.stlouisfed.org/series/AAA']] },
  { id:'R', name:'实际利率', subtitle:'折现率是否另起压力？', formula:'10y 实际利率，3 个月上升 ≥ 25bp', mechanism:'实际利率上升可能压低远期现金流现值；成长预期、盈利及风险溢价也会同时变化。', pending:'11 月初起检查：10 月 FII10 官方月度值公布、实际收取并核对口径后可计算，与已收到的 7 月值比较。确切可用日以实际发布与收取为准。', detail:'固定使用 FRED FII10：10 年期 TIPS 恒定期限实际收益率的官方月度序列。比较 2026 年 10 月与 7 月；有限负利率也是有效输入。', rule:'ΔR = FII10m − FII10m−3。按百分点计算，四舍五入到 10 位小数后 ≥ 0.25 为 TRUE，否则 FALSE。缺失或不可比为 UNKNOWN；不用本周日度变化或自行算出的月均值替代。', reversal:'下一期可比月度 ΔR < 25bp，该期利率为未触发；每期重新判断，原记录不改写。不代表利率绝对水平已经宽松。', links:[['FRED · FII10','https://fred.stlouisfed.org/series/FII10'],['ALFRED 版本档案','https://alfred.stlouisfed.org/series?seid=FII10']] }
];

export function outlookView(input = ACTUAL_INPUTS, simulated = false) {
  return `<section class="outlook-hero card"><div><div class="outlook-kicker">NEXT 1–6 MONTHS / CONDITIONAL OUTLOOK</div><h2>先看哪一环变弱，<br>再看风险是否得到确认。</h2><p>截至 2026.10.21，10 月观察期尚未结束。广度最早在 10/30 美股收盘后验收计算；信用与实际利率从 11 月初检查官方月度值，公布并收取后可计算。首期正式判断按当前官方日历在 11/06 美东 09:25（台北 22:25）截止。</p><div class="outlook-hero-actions"><button class="soft-button" data-view="history">查看已有检验</button><a href="./outlook-protocol.json" target="_blank" rel="noopener noreferrer">冻结规则原文 ↗</a><a href="./final-qa.json" target="_blank" rel="noopener noreferrer">最终 QA 记录 ↗</a></div></div><div class="outlook-readiness"><span>实际监测状态</span><strong>等待 10 月数据</strong><div>${['B','T','R'].map(k=>`<span><b>${k}</b> UNKNOWN</span>`).join('')}</div><p>最早准备：10/30 美股收盘后<br>正式判断：11/06 09:25 EST<br>台北 11/06 22:25 截止<br>届时仍缺失的项目保留 UNKNOWN</p></div></section>
    <div class="section-heading"><h2>三个监测 component</h2><span>固定阈值 · 不因结果调参</span></div>
    <section class="outlook-components" aria-label="正式监测组件">${components.map(c=>`<article class="card outlook-component"><div class="outlook-component-top"><span class="outlook-letter">${c.id}</span>${status('UNKNOWN')}</div><h3>${c.name}</h3><p class="outlook-component-question">${c.subtitle}</p><div class="outlook-formula">${c.formula}</div><p>${c.mechanism}</p><div class="outlook-pending">${c.pending}</div><details><summary>计算、来源与撤销条件</summary><p>${c.detail}</p><p>${c.rule}</p><h4>怎样撤销这项信号</h4><p>${c.reversal}</p><div class="outlook-source-links">${c.links.map(([l,u])=>`<a href="${u}" target="_blank" rel="noopener noreferrer">${l} ↗</a>`).join('')}</div></details></article>`).join('')}</section>
    <div class="section-heading"><h2>条件推演：不同组合，会改变什么判断？</h2><span>切换假设，不修改真实数据</span></div>
    <section class="outlook-explorer"><div class="card outlook-controls"><div class="outlook-kicker">FIXED LOGIC / H1 + H2</div><h3>选择组件状态</h3><p>“未触发”表示有合格数据且没越过阈值；缺数据请选择 UNKNOWN。</p>${components.map(c=>`<label for="outlook-${c.id}"><span>${c.id} · ${c.name}</span><select id="outlook-${c.id}" data-outlook-input="${c.id}">${choices.map(v=>`<option value="${v}" ${input[c.id]===v?'selected':''}>${v==='UNKNOWN'?'UNKNOWN · 无法判断':v==='TRUE'?'TRUE · 已触发':'FALSE · 未触发'}</option>`).join('')}</select></label>`).join('')}<button class="soft-button" type="button" data-outlook-reset>恢复实际快照</button><small>没有点位预测、拟合系数或可调参数。</small></div><div class="card outlook-result" id="outlook-result" role="status" aria-live="polite" aria-atomic="true">${outlookResult(input,simulated)}</div></section>
    <div class="section-heading"><h2>经济背景：帮助解释，不充当模型输入</h2><button class="text-button" data-view="chain">查看完整传导链 →</button></div>
    <section class="outlook-context"><button class="card" data-detail="topic:inflation"><span>通胀 → Fed</span><strong>能源压力，核心待验证</strong><p>9 月 CPI +0.6% 环比；8 月核心 PCE +0.2%。观察期不同，不能据此宣布 9 月 PCE 已降温。</p></button><button class="card" data-detail="topic:rates"><span>利率 → 股票</span><strong>实际利率本周下降，股指仍跌</strong><p>10/9–10/16 实际 10y −17bp，标普 −1.95%。不能把这一周股跌归因于实际利率上升。</p></button><button class="card" data-detail="review:earnings"><span>估值与盈利 · CONTEXT ONLY</span><strong>高增长预期，兑现仍少</strong><p>10/16 远期 P/E 19.0 倍；Q3 混合盈利增长 29.0%，仅 9% 公司已报。历史盈利修订暂未接入。</p></button></section>
    <div class="section-heading"><h2>接下来怎样验证，什么会推翻它</h2><span>区分“信号撤销”与“模型无效”</span></div>
    <section class="card outlook-validation"><div class="outlook-milestones"><article><span>01 / 2026.10.30</span><h3>收盘后开始验收名单</h3><p>美东 10/30 16:00（台北 10/31 04:00）收盘后，收到必要新版本，再核对增删边界、永久 ID 与 200 日价格。完成验收后才可计算；未解记录进入上下界。</p></article><article><span>02 / 2026.11.06</span><h3>冻结首期判断</h3><p>美东 09:25 截止。月度 BAA、AAA、FII10 和价格必须实际收取。迟到或缺失记 UNKNOWN，不回填旧判断。</p></article><article><span>03 / 2026.11—2027.04</span><h3>等待六个月末结果</h3><p>以决策日收盘为起点，观察此后第 1–6 个 NYSE 月末。任何累计 SPY 现金分红调整回报 ≤ −15% 才达到损失目标；六期齐全再评分。</p></article></div>
    <details><summary>完整验证标准、误报负担与推翻条件</summary><div class="outlook-validation-grid"><article><h4>已有证据不等于样本外预测</h4><p>Stage 3 的 86 个成熟月份、2020 与 2022 两次危机都已看过。信用 T 与广度 + 信用 TB 的月度结果相同：0 TP / 7 FP / 6 FN；广度单独 B 为 1 TP / 21 FP / 5 FN。上下界重合是已识别数据路径的结果，不是置信区间。</p><p>旧行业 + 信用 TC 为 0 TP / 4 FP / 6 FN。三个组合的历史损失目标均从信号月末起算，与新的决策日收盘起点不同，不能直接当成未来成功率。</p></article><article><h4>H1：分层是否有用</h4><p>广度观察 = B；信用确认 = B ∧ T；信用单独 = T ∧ ¬B。至少两次合格独立危机里，明确的广度观察要比信用确认早至少一个日历月，或在完整比较窗口确认始终不出现时提供有效提示。剔除最好一次后仍需有用。</p><p>若多数观察只是误报、下跌已发生或反弹期提示，或必须降低阈值才有优势，不能支持使用。分层通过也只证明监测组织有用，不创造新预测信息。</p></article><article><h4>H2：利率是否真正增量</h4><p>比较 B ∨ T ∨ R 与 B ∨ T，必须在同一数据路径上配对。至少增加 1 个月度 TP，且不能减少独立危机命中；至少两次独立危机获得新增或早至少一个日历月的有效提示。彼时基线必须安静；剔除最好一次仍有增量，并单列 R 自己的表现。</p><p>只是解释既有广度信号、只靠一次危机、时间戳超前、已经下跌才触发或超过误报预算，都不能据此晋级为有效预测。</p></article><article><h4>36 期固定负担上限</h4><p>广度观察的损失误报连续段 ≤12；信用确认、信用单独、利率新增各 ≤6。基础与扩展监测的活跃决策各 ≤18。H1 与 H2 分别适用通知上限：全部风险复核通知 ≤18，其中损失误报通知 ≤12；同一期多个原因合并为一条通知。通知按冻结的状态转换规则计数；持续同态不重复计，降级或解除不产生新的升级通知；UNKNOWN 前态保留计数上下界。</p><p>这些是冻结的研究复核容量假设，不是测得的最优仓位或你的损失容忍度。仍报告每个误报月、漏报、提前量和 UNKNOWN；超预算不能隐藏信号。</p></article></div><p class="outlook-protocol-note">验证队列固定为 2026/11—2029/10 共 36 期；至少 33 期及时、可判定，至少 3 次具有完整预警机会的独立危机。12 / 24 期只做数据质量审查。最后结果到 2030/03，按协议在 2030/04 固定版本后整体评分；不足仍为 INCONCLUSIVE。支持必须在悲观界下同时满足提前预警／增量证据与全部负担门槛，不能选最有利路径；完整危机机会、连续提示段、边缘样本与精确提前量规则以冻结原文为准。</p><p class="outlook-protocol-note">规则版本 SHA-256：<code>${PROTOCOL_SHA}</code>。本页只新增展示和条件推演；未运行新回测、未修改参数、未生成正式前瞻判断。原文中“本轮不改 dashboard”指当时冻结工作的范围；本页为后续获授权的展示层。</p></details></section>`;
}

export function outlookReportLines() {
  return ['【前瞻情景 · 冻结规则条件推演】','准备状态说明2026-10-21：正式2026年10月B/T/R尚未齐备。B最早10/30美东16:00收盘后（台北10/31 04:00），收到必要版本并完成验收后可算；T/R从11月初检查官方月值，实际公布、收取及核对口径后可算。首期11/06 09:25EST（台北22:25）截止，仍缺失或未验收则保留UNKNOWN。',
    ...components.flatMap(c=>[`${c.id} ${c.name}：${c.formula}`,c.rule,c.reversal]),
    'H1：WATCH=B；CONFIRMED=B AND T；CREDIT_ONLY=T AND NOT B；BASE_ANY=B OR T。',
    'H2：RATE_WATCH=R；EXTENDED_ANY=B OR T OR R；INCREMENTAL_RATE=R AND NOT(B OR T)；RATE_WHILE_CREDIT_QUIET=R AND NOT T。',
    '未知值保留全部相容状态；不拟合概率或收益率。交互假设不导出为实际判断、不写账本。已看历史仅为开发证据。',
    '36期固定前瞻队列2026/11—2029/10，完整评价在2030/04；至少33期及时可判定及3次完整机会独立危机，否则证据不足。',
    `冻结协议 SHA-256：${PROTOCOL_SHA}`,'规则原文：'+new URL('./outlook-protocol.json',document.baseURI).href,''];
}
