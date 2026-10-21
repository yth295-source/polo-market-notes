import { reviewStatusView, reviewStatusReportLines } from './review-status.js';
import { FORECAST } from './forecast-data.js';
import { forecastView, forecastReportLines } from './forecast.js';
import { DATA } from './data.js';
import { historyView, historyTeaser, historyReportLines } from './history.js';
import { ACTUAL_INPUTS, outlookView, outlookResult, outlookReportLines } from './outlook.js';

const app = document.getElementById('app');
const detail = document.getElementById('detail-dialog');
const searchDialog = document.getElementById('search-dialog');
const topicMap = new Map(DATA.topics.map(x => [x.id, x]));
const metricMap = new Map(DATA.metrics.map(x => [x.id, x]));
const sourceMap = new Map(DATA.sources.map(x => [x.id, x]));
const state = { view: 'overview', filter: 'all', sourceQuery: '', activeDetail: null, detailTab: 'judgment', lastTrigger: null, mobileOpen: false, historyCase: '2000-02' };
let outlookInputs = { ...ACTUAL_INPUTS };
let outlookSimulated = false;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/>',
  chain: '<path d="M10 13a5 5 0 0 0 7 .1l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7-.1l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2M8 18h2"/>',
  book: '<path d="M12 6c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Z"/><path d="M12 6v15"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  upRight: '<path d="M7 17 17 7M7 7h10v10"/>',
  downRight: '<path d="m7 7 10 10M7 17h10V7"/>',
  chevron: '<path d="m9 5 7 7-7 7"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  inflation: '<path d="m3 17 6-6 4 4 8-10M15 5h6v6"/><path d="M4 21h16"/>',
  fed: '<path d="m3 9 9-6 9 6H3Zm1 12h16M6 10v8M10 10v8M14 10v8M18 10v8"/>',
  rates: '<path d="m3 8 5 5 5-3 8 8M17 18h4v-4"/><path d="M4 3v18h17"/>',
  stocks: '<path d="M4 20h17M7 16V9M12 13V4M17 17v-6"/><path d="M5 10h4v4H5zM10 6h4v4h-4zM15 12h4v3h-4z"/>',
  warning: '<path d="m10.3 4-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v5M12 17v.1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  shield: '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  file: '<path d="M14 3H5v18h14V8l-5-5Z"/><path d="M14 3v5h5M8 12h8M8 16h6"/>',
  external: '<path d="M14 3h7v7M10 14 21 3M10 3H3v18h18v-7"/>',
};
const icon = (name, extra = '') => `<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const sourceLink = id => {
  const s = sourceMap.get(id);
  return s ? `<a class="inline-source" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.publisher)}${icon('external')}</a>` : '';
};
const list = items => `<ul class="simple-list">${(items || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
const tag = (label, tone = 'neutral') => `<span class="status-tag ${tone}"><span class="dot"></span>${esc(label)}</span>`;

function shell() {
  app.innerHTML = `<div class="app-frame"><aside class="sidebar" aria-label="主导航">
    <a href="#overview" class="brand" aria-label="Polo’s market notes 首页"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><div><div class="brand-word">Polo’s</div><div class="brand-sub">market notes · 市场解读</div></div></a>
    <nav class="side-nav">${[['overview','grid','监测总览'],['chain','chain','传导链'],['outlook','inflation','研究预测'],['history','clock','检验记录'],['calendar','calendar','验证日历'],['sources','book','数据来源']].map(([id,i,label]) => `<button type="button" class="nav-button" data-view="${id}">${icon(i)}<span>${label}</span></button>`).join('')}</nav>
    <div class="nav-edition"><span class="status-dot"></span>研究工作台<span class="edition-avatar">P</span></div>
  </aside><div class="workspace"><header class="topbar"><div class="breadcrumbs"><button class="mobile-menu" type="button" data-action="menu" aria-label="打开导航" aria-expanded="false">${icon('menu')}</button><span class="muted">WORKSPACE</span>${icon('chevron','icon-sm breadcrumb-chevron')}<strong id="breadcrumb-current">监测总览</strong></div><div class="top-actions"><button type="button" class="search-trigger" data-action="search" aria-label="查找指标与来源">${icon('search','icon-sm')}<span>查找指标与来源</span><kbd>⌘ K</kbd></button><button type="button" class="export-button" data-action="export" aria-label="导出完整研究报告">${icon('download','icon-sm')}<span>导出报告</span></button></div></header><main class="content" id="main" tabindex="-1"></main></div></div>`;
  renderView();
}

function pageHeading(title, description, eyebrow = 'U.S. MARKET INTELLIGENCE', reviewDate = '2026.10.18') {
  return `<div class="page-heading"><div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div><div class="heading-meta"><span class="pill">${icon('clock')}未来 1–6 个月</span><span class="pill snapshot">${icon('file')}复核 · ${esc(reviewDate)}</span></div></div>`;
}

function footer() {
  return `<footer class="page-footer"><div class="footer-left">${icon('shield')}<span>研究复核 2026.10.18 · 各指标日期单列<br>公开版随完成审核的研究复核同步；观点签发日和数据观察日分别保留。</span></div><button type="button" data-detail="method:qa">口径与核验记录 ${icon('upRight','icon-sm')}</button></footer>`;
}

const chainPresentation = {
  inflation: { subtitle: '能源抬头，核心仍需验证', value: '3.7', unit: '%', caption: '整体 CPI 同比', date: '2026 年 9 月', brief: '已发生 · 能源冲击' },
  fed: { subtitle: '已经加息，下一步仍有条件', value: '+25', unit: 'bp', caption: '9 月利率调整', date: '09.16 政策决议', brief: '已确认 · 收紧方向' },
  rates: { subtitle: '门槛仍高，本周边际缓和', value: '−17', unit: 'bp', caption: '10y 实际收益率周变动', date: '10.09 → 10.16', brief: '边际变化 · 实际利率↓' },
  stocks: { subtitle: '盈利预期很强，等待兑现', value: '−1.95', unit: '%', caption: '标普 500 当周表现', date: '截至 10.16 的一周', brief: '待验证 · 盈利韧性' }
};

function chainCards() {
  return `<div class="chain-grid">${DATA.topics.map((t,i) => { const c = chainPresentation[t.id]; return `<button type="button" class="card chain-card" data-detail="topic:${t.id}" aria-label="查看${esc(t.title)}指标、逻辑与来源"><div class="chain-card-top"><span class="step-label">0${i+1} / ${['INFLATION','POLICY','RATES','EQUITIES'][i]}</span><span class="chain-icon">${icon(t.id)}</span></div><h3>${esc(t.title)}</h3><p class="chain-lead">${esc(c.subtitle)}</p><div class="chain-metric"><strong class="num">${c.value}</strong><small>${c.unit}</small></div><div style="font-size:9px;color:#899aa5;margin-bottom:13px">${esc(c.caption)}</div><div class="chain-foot"><span>${esc(c.date)}</span>${icon('arrow')}</div></button>`; }).join('')}</div>`;
}

function ratesChart(measuredWidth=490) {
  const values = DATA.charts.rates;
  const width=Math.max(260,measuredWidth), height=174, left=37, right=57, top=22, bottom=27;
  const dates=values.map(d=>Date.parse(`2026-${d.date.replace('.', '-')}T00:00:00Z`));
  const x=i => left+(dates[i]-dates[0])/(dates.at(-1)-dates[0])*(width-left-right);
  const y=v => top+(5.65-v)/(5.65-1.9)*(height-top-bottom);
  const line=k=>values.map((d,i)=>`${i?'L':'M'}${x(i)},${y(d[k])}`).join(' ');
  return `<svg class="rate-chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="rates-chart-title rates-chart-desc"><title id="rates-chart-title">10 年期名义与实际收益率</title><desc id="rates-chart-desc">三个核验观察点：9 月16日名义5.01%、实际2.68%；10月9日5.24%、2.91%；10月16日5.09%、2.74%。连线仅连接这三个快照点。</desc>${[2,3,4,5].map(v=>`<line x1="${left}" x2="${width-right+15}" y1="${y(v)}" y2="${y(v)}" stroke="#edf0f3"/><text x="${left-9}" y="${y(v)+3}" text-anchor="end">${v}%</text>`).join('')}${values.map((d,i)=>`<text x="${x(i)}" y="${height-6}" text-anchor="middle">${esc(d.date)}</text>`).join('')}<path d="${line('nominal')}" stroke="#8b72cd" stroke-width="2" fill="none"/><path d="${line('real')}" stroke="#a4b8d3" stroke-width="2" fill="none"/>${values.map((d,i)=>`<circle cx="${x(i)}" cy="${y(d.nominal)}" r="3.5" fill="#8b72cd"><title>${esc(d.date)} 名义收益率 ${d.nominal}%</title></circle><circle cx="${x(i)}" cy="${y(d.real)}" r="3.5" fill="#a4b8d3"><title>${esc(d.date)} 实际收益率 ${d.real}%</title></circle>`).join('')}<text class="value-label" x="${x(2)+11}" y="${y(values[2].nominal)+4}">5.09%</text><text class="value-label" x="${x(2)+11}" y="${y(values[2].real)+4}">2.74%</text></svg>`;
}

function earningsReviewWindow() {
  return `<button type="button" class="card pricing-card" style="width:100%;margin-bottom:12px" data-detail="review:earnings"><div class="pricing-index"><span>持续验证窗口 · 2026 年 10–11 月 · 每周复核</span>${icon('upRight')}</div><h3>财报季：高盈利预期，能否变成真实利润？</h3><p>核对已报覆盖率、公开盈利预期、利润率、现金流与公司指引。具体公司披露日以其公告为准。</p></button>`;
}

function calendarRows(events, full = false) {
  const labels = { inflation:'通胀', fed:'政策', rates:'利率', stocks:'盈利' };
  return `<div class="card calendar-card"><div class="calendar-head"><span>台北日期 / 时间</span><span>计划发布</span><span class="event-question">这次要验证什么</span><span style="text-align:right">类别</span></div>${events.map(e=> { const parts=e.at.slice(0,10).split('-');const day=Number(parts[2]);const month=Number(parts[1]);const time=e.timeLabel.split(' · ')[0];return `<button type="button" class="event-row" data-detail="event:${e.id}" aria-label="${esc(e.dateLabel)} ${esc(e.title)}，查看验证条件"><div class="event-date"><span class="date-square">${day}</span><div><span class="month">${parts[0] === '2026' ? `${month} 月` : `${parts[0]} / ${month} 月`}</span><small class="num">${esc(time)}${e.timeLabel.includes('预计')?'*':''}</small></div></div><div><div class="event-title">${esc(e.title)}</div><div class="event-subtitle">${e.id==='cal-cpi'?'部分同比缺失 · 优先看环比与动量':e.id==='cal-fomc-oct'?'先于 9 月 PCE 公开发布':full?esc(e.caution):'点击查看确认与推翻条件'}</div></div><div class="event-question">${esc(e.question)}</div><span class="event-category">${labels[e.topic]||'验证'}</span></button>`;}).join('')}${events.length?'':'<div class="empty-state">本期没有这一类别的计划事件。</div>'}</div>`;
}

function keyReads() {
  const cards=[['cpi-headline-yoy','inflation','整体 CPI · 同比','9 月 · 10/14 发布','核心环比 +0.3%','warning'],['fed-range','fed','Fed 目标区间','9/16 决议 · 加息 25bp','收紧方向调整','neutral'],['ust-10y','rates','10 年期美债','10/16 · 美国交易日','一周 −15bp','positive'],['sp500','stocks','标普 500 · 收盘','10/16 · 价格指数','一周 −1.95%','warning']];
  return `<section class="kpi-grid" aria-label="四项关键数据">${cards.map(([id,i,label,date,change,tone])=>{const m=metricMap.get(id);return `<button type="button" class="card kpi-card" data-detail="metric:${id}"><div class="kpi-top"><span class="kpi-icon">${icon(i)}</span>${icon('upRight','icon-sm')}</div><span class="kpi-label">${label}</span><div class="kpi-value num">${esc(m.value)}<small>${esc(m.unit)}</small></div><div class="kpi-bottom"><span>${date}</span><span class="metric-badge ${tone}">${change}</span></div></button>`;}).join('')}</section>`;
}

function collectionCard() {
  return `<article class="card collection-card"><div class="card-top"><h2>数据采集</h2><span class="subtle-live"><i></i>任务已启用</span></div><p class="section-description">America/New_York · 自动跟随夏令时</p><div class="collection-slot"><span class="slot-icon">${icon('globe')}</span><div><span>开盘前</span><strong class="num">09:00</strong></div><span>美东每天</span></div><div class="collection-slot"><span class="slot-icon">${icon('clock')}</span><div><span>日终</span><strong class="num">23:59</strong></div><span>美东每天</span></div><div class="collection-foot">按真实完成时间留存。跨过午夜的数据归入实际收取日。</div><button type="button" class="soft-button" data-detail="collection:status">查看采集与缺失规则 ${icon('arrow','icon-sm')}</button></article>`;
}

function firstDecisionCard() {
  return `<article class="card first-decision"><div class="card-top"><h2>首期前瞻判断</h2>${tag('待观察','neutral')}</div><div class="decision-date"><strong class="num">11<span>/</span>06</strong><span>09:25 EST 截点<br>台北 22:25</span></div><div class="readiness-rows"><div><span>10 月末成分股锚点</span><b>UNKNOWN</b></div><div><span>10 月月度数据</span><b>尚未齐备</b></div><div><span>正式判断记录</span><b>0 条</b></div></div><p>10/30 收盘后验收名单与价格连续性。缺失或迟到保留 UNKNOWN。</p><button type="button" class="text-button" data-detail="collection:anchor">查看验收流程 ${icon('arrow','icon-sm')}</button></article>`;
}

function overview() {
  return `${pageHeading('把市场变化，变成可验证的判断。','从通胀、政策到利率与股票，先看证据，再形成观点。')}${reviewStatusView()}<p class="snapshot-baseline-label">以下为 10/18 完整金融复核的基线快照；最新已复核变化见上方，各卡片保留原观察日期。</p>${keyReads()}
    <div class="dashboard-grid"><div class="main-column"><article class="hero"><div class="hero-top"><div class="label-with-icon"><span class="pulse-dot"></span>本期主情景</div>${tag('工作判断 · 待后续验证','neutral')}</div><h2>通胀再承压，<br>盈利等待兑现。</h2><p class="hero-summary">能源推高物价，Fed 已向收紧方向调整。最近一周实际利率回落、股票仍下跌，接下来要查盈利兑现与信用压力。</p><div class="hero-bottom"><span>长期通胀失控与衰退均未确认</span><button type="button" class="text-button" data-detail="scenario:base">判断与反证 ${icon('upRight')}</button></div></article>
    <section class="card chart-card" aria-labelledby="chart-heading"><div class="chart-header"><div><div class="eyebrow">RATES / 三个核验观察点</div><h2 id="chart-heading">利率回落，尚未换来股票止稳。</h2></div><button class="round-button" type="button" data-detail="topic:rates" aria-label="查看利率指标与公开来源">${icon('upRight')}</button></div><div class="chart-summary"><div><span>名义 10 年期</span><strong class="num">5.09<small>%</small></strong></div><div><span>实际 10 年期</span><strong class="num">2.74<small>%</small></strong></div><span class="metric-badge positive">实际利率一周 −17bp</span></div><div class="chart-caption"><span class="legend"><i></i>名义收益率</span><span class="legend real"><i></i>实际收益率</span><span>美国交易日 · 2026 年</span></div>${ratesChart()}<p class="chart-note">连线仅连接三个快照，非完整日线。同期股价走弱，不能归因于“实际利率正在上升”。</p></section></div><aside class="status-rail" aria-label="采集计划与前瞻状态">${collectionCard()}${firstDecisionCard()}</aside></div>
    <section aria-labelledby="alerts-heading"><div class="section-heading"><h2 id="alerts-heading">下一步，重点盯住什么？</h2><span class="eyebrow">RISK WATCH</span></div><div class="watch-grid">${[DATA.alerts[0],DATA.alerts[1],DATA.alerts[2]].map((x,i)=>`<button type="button" class="card watch-card" data-detail="alert:${x.id}"><div class="watch-top"><span class="watch-number">0${i+1}</span>${tag(['通胀扩散','信用压力','盈利兑现'][i],'neutral')}${icon('upRight','icon-sm')}</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><div class="watch-evidence"><strong class="num">${['+0.5%','+53 bp','9%'][i]}</strong><span>${['9 月 PPI · 剔除食能与贸易服务','HY OAS · 9/17 → 10/15','已报财报覆盖率 · 10/16'][i]}</span></div></button>`).join('')}</div></section>
    <section aria-labelledby="pricing-heading"><div class="section-heading"><h2 id="pricing-heading">市场已经反映什么？</h2><span>可观察的价格证据</span></div><div class="pricing-grid">${DATA.pricing.map((p,i)=>`<button type="button" class="card pricing-card" data-detail="pricing:${p.id}"><div class="pricing-index"><span>0${i+1} / ${['利率','估值','风险补偿'][i]}</span>${icon('upRight')}</div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><div class="pricing-evidence">${icon('check')}${['2y 4.74% · 实际 10y 2.74%','预期 P/E 19.0 倍 · 盈利尚待兑现','HY 323bp · 观察日 10/15'][i]}</div></button>`).join('')}</div><p class="section-footnote">收益率、估值与利差无法可靠换算成“风险已计价百分比”；当前会议概率为 UNKNOWN。</p></section>
    <section class="card financial-review-banner"><span class="review-stamp">${icon('shield')}</span><div><div class="eyebrow">FINANCIAL REVIEW · 2026.10.18</div><h2>数据复核与历史检验，分别看结论。</h2><p>25 项数据已核验，1 项 UNKNOWN；12 项计算复算一致。既有历史检验尚未证明广度有增量价值。</p></div><div class="review-actions"><button type="button" class="soft-button" data-detail="audit:financial">本期金融核验 ${icon('upRight','icon-sm')}</button><button type="button" class="text-button" data-view="history">误报、漏报与提前量 ${icon('arrow','icon-sm')}</button></div></section>
    <section aria-labelledby="calendar-heading"><div class="section-heading"><h2 id="calendar-heading">验证日历</h2><button type="button" class="text-button" data-view="calendar">查看完整日历 ${icon('arrow')}</button></div>${calendarRows(DATA.calendar.slice(0,6))}<div class="calendar-warning">${icon('info')}<span>时间按台北显示。11/10 的 10 月 CPI 部分同比缺少去年基期，应核对官方环比与可计算动量。</span></div></section>${footer()}`;
}

function chainView() {
  return `${pageHeading('传导链分析','每一步都可以被验证，也可以被推翻。','FOLLOW THE TRANSMISSION')}
    <p class="view-intro">通胀预测、政策反应、利率重定价和股票回报，是四个分别可能失败的判断。点击指标，可查看观察期、发布日期、口径及公开来源。</p>
    ${DATA.topics.map((t,i)=>`<section class="card topic-section" id="topic-${t.id}"><div class="topic-section-top"><div><div class="eyebrow">0${i+1} / ${['INFLATION','FED POLICY','INTEREST RATES','EQUITIES'][i]}</div><h2>${esc(t.title)} · ${esc(t.kicker)}</h2></div>${tag(t.status,t.statusTone)}</div><p>${esc(t.summary)}</p><div class="topic-metrics">${t.metricIds.map(id=>{const m=metricMap.get(id);return `<button type="button" class="topic-metric" data-detail="metric:${m.id}"><span>${esc(m.label)}</span><strong class="num">${esc(m.value)}<small>${esc(m.unit)}</small></strong><p>${esc(m.period)}</p></button>`;}).join('')}</div><div class="two-column"><div><h3 class="mini-heading positive">${icon('check','icon-sm')}什么会增强判断</h3>${list(t.confirmation)}</div><div><h3 class="mini-heading warning">${icon('info','icon-sm')}什么会推翻判断</h3>${list(t.falsification)}</div></div><div style="margin-top:18px"><button type="button" class="text-button" data-detail="topic:${t.id}">查看传导逻辑、口径与来源 ${icon('arrow')}</button></div></section>`).join('')}${footer()}`;
}

function calendarView() {
  const events=state.filter==='all'?DATA.calendar:DATA.calendar.filter(x=>x.topic===state.filter);
  return `${pageHeading('验证日历','为每一个判断，安排下一次证据检查。','THE NEXT EVIDENCE')}
    <p class="view-intro">按 2026 年 10 月 18 日复核整理的计划事件，全部使用台北时间。每次发布后，重新检查主情景的确认与撤销条件。</p>
    <div class="filter-bar" aria-label="按事件类别筛选">${[['all','全部事件'],['inflation','通胀与成本'],['fed','政策与就业'],['stocks','盈利验证']].map(([id,label])=>`<button type="button" class="filter-button ${state.filter===id?'active':''}" data-filter="${id}" aria-pressed="${state.filter===id}">${label}</button>`).join('')}<span style="margin-left:auto;color:#607581;font-size:11px">${events.length} 项定期发布${['all','stocks'].includes(state.filter)?' · 1 项持续验证':''}</span></div>
    ${['all','stocks'].includes(state.filter)?earningsReviewWindow():''}${state.filter==='stocks'?'':calendarRows(events,true)}<div class="calendar-warning">${icon('info')}<span>2026 年 10 月 CPI 的部分同比将因 2025 年基期缺失无法公布。11/10 应检查环比、可计算的三个月动量及分项，而非将填补值当作官方同比。带 * 的 FOMC 时间为例行安排换算。</span></div>${footer()}`;
}

function sourcesView() {
  const q=state.sourceQuery.toLowerCase();
  const sources=DATA.sources.filter(s=>`${s.name} ${s.publisher} ${s.note}`.toLowerCase().includes(q));
  return `${pageHeading('指标与公开来源','保留观察期、公布时间与证据边界。','TRACEABLE BY DESIGN')}
    <p class="view-intro">${DATA.metrics.length} 个指标，${DATA.sources.length} 个公开来源。可访问的数据不一定具有开放再分发许可；来源说明保留相关限制。</p>
    <div class="source-toolbar"><input class="source-search" id="source-search" type="search" placeholder="查找机构、指标或口径…" aria-label="筛选公开来源" value="${esc(state.sourceQuery)}"><span class="source-count">${sources.length} 个来源</span></div>
    <div id="source-list">${sources.map(s=>`<article class="card source-card"><div><div class="source-publisher">${esc(s.publisher)}</div><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p></div><div class="source-time">观察至 ${esc(s.observedThrough)}<br>核验于 ${esc(s.accessedAt)}</div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="打开${esc(s.name)}公开来源">${icon('external')}</a></article>`).join('')||'<div class="empty-state">没有匹配来源，试试 “CPI” 或 “Fed”。</div>'}</div>
    <div class="section-heading"><h2>独立 QA 后保留的研究纪律</h2><button class="text-button" type="button" data-detail="method:qa">查看完整口径 ${icon('arrow')}</button></div><div class="card qa-list">${DATA.qa.map(q=>`<article class="qa-item"><h3>${esc(q.title)}</h3><p>${esc(q.text)}</p></article>`).join('')}</div>${footer()}`;
}

function renderView(focus=false) {
  chartObserver?.disconnect();
  const main=document.getElementById('main');
  const views={overview,chain:chainView,calendar:calendarView,sources:sourcesView,outlook:()=>pageHeading('研究预测','形成明确观点，保留依据；关键前提改变时再修订。','RESEARCH / WORKING FORECAST', FORECAST.lastEvidenceCheck.replaceAll('-', '.'))+reviewStatusView()+forecastView(FORECAST)+`<details class="card formal-research"><summary>正式月度检验与条件推演 · 独立研究轨道</summary><p>本区准备状态说明更新：2026.10.21。当前 UNKNOWN 表示 10 月正式实验输入尚未齐备；各项最早可计算时间见下方。上方研究预测继续独立提供观点，手动推演不会改写判断账本。</p>${outlookView(outlookInputs,outlookSimulated)}</details><footer class="page-footer"><div class="footer-left">${icon('shield')}<span>研究预测 ${esc(FORECAST.date)} · ${esc(FORECAST.version)}<br>完成复核后同步证据摘要；重大变化才签发新观点。日期不随打开网页更新。</span></div><a href="./forecast.json" target="_blank" rel="noopener noreferrer">本版研究记录 ↗</a></footer>`,history:()=>pageHeading('金融检验记录','查看误报、漏报、提前量，以及结论的适用范围。','VALIDATION / DEVELOPMENT HISTORY')+historyView(state.historyCase)+footer()};
  main.innerHTML=(views[state.view]||overview)();
  document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('active',b.dataset.view===state.view);if(b.classList.contains('nav-button'))b.setAttribute('aria-current',b.dataset.view===state.view?'page':'false');});
  document.getElementById('breadcrumb-current').textContent={overview:'监测总览',chain:'传导链分析',calendar:'验证日历',sources:'指标与来源',outlook:'研究预测',history:'金融检验记录'}[state.view];
  document.title=`${{overview:'美国市场监测',chain:'传导链分析',calendar:'验证日历',sources:'指标与来源',outlook:'研究预测',history:'金融检验记录'}[state.view]} · Polo’s market notes`;
  syncNavAccessibility();
  const chart=document.querySelector('.chart-card');
  if(chart){chartObserver=new ResizeObserver(()=>{const svg=chart.querySelector('.rate-chart');if(svg){const width=svg.getBoundingClientRect().width;if(width>0)svg.outerHTML=ratesChart(width);}});chartObserver.observe(chart);}
  if(focus) { window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true}); }
}

function navigate(view,focus=true) {
  if(!['overview','chain','calendar','sources','history','outlook'].includes(view))view='overview';
  state.view=view;setMobile(false);history.replaceState(null,'',`#${view}`);renderView(focus);
}

function setMobile(open) {
  const wasOpen=state.mobileOpen;
  state.mobileOpen=open;
  document.querySelector('.sidebar').classList.toggle('is-open',open);
  document.querySelector('[data-action="menu"]').setAttribute('aria-expanded',String(open));
  document.querySelector('.sidebar-overlay')?.remove();
  if(open){const overlay=document.createElement('button');overlay.className='sidebar-overlay';overlay.setAttribute('aria-label','关闭导航');overlay.onclick=()=>setMobile(false);app.append(overlay);}
  syncNavAccessibility();
  if(open)document.querySelector('.sidebar .nav-button.active')?.focus();
  else if(wasOpen)document.querySelector('[data-action="menu"]')?.focus();
}

function syncNavAccessibility(){const sidebar=document.querySelector('.sidebar');if(sidebar)sidebar.inert=window.matchMedia('(max-width: 740px)').matches&&!state.mobileOpen;}

function detailMetric(m) {
  return `<article class="detail-metric"><div class="detail-metric-heading"><h3>${esc(m.label)}</h3><span class="metric-change">${esc(m.change)}</span></div><strong class="num">${esc(m.value)}<small>${esc(m.unit)}</small></strong><dl><div><dt>观察期 / 市场日期</dt><dd>${esc(m.period)}</dd></div><div><dt>公开发布 / 更新日</dt><dd>${esc(m.releasedAt)}</dd></div><div><dt>更新频率</dt><dd>${esc(m.frequency)}</dd></div><div><dt>本期来源复核 · 台北</dt><dd>${m.verifiedAt?esc(new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Taipei',dateStyle:'medium',timeStyle:'short'}).format(new Date(m.verifiedAt))):'原快照'}</dd></div><div><dt>核验状态</dt><dd>${m.verificationStatus?.startsWith('UNKNOWN')?'UNKNOWN · 一手终点未核验':'来源已核验'}${m.verificationStatus?.includes('RECALCULATED')?' · 已复算':''}</dd></div></dl><p>${esc(m.note)}</p>${m.sourceIds.map(sourceLink).join('')}</article>`;
}

function detailSources(ids) {
  return [...new Set(ids)].map(id=>{const s=sourceMap.get(id);if(!s)return '';let domain='';try{domain=new URL(s.url).hostname;}catch{}return `<a class="detail-source" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer"><h3>${esc(s.name)}${icon('external')}</h3><p>${esc(s.publisher)} · 观察至 ${esc(s.observedThrough)}<br>${esc(s.note)}<br>来源核验 ${esc(s.accessedAt)}</p><div class="source-domain">${esc(domain)}</div></a>`;}).join('');
}

function section(title,body,iconName) {
  return `<section class="detail-section"><h3>${iconName?icon(iconName,'icon-sm'):''}${esc(title)}</h3>${body}</section>`;
}

function scenarioContent() {
  return `<div class="detail-highlight">${esc(DATA.snapshot.thesis)}</div>${section('我们现在看到什么',`<p>${esc(DATA.snapshot.summary)}</p>`,'globe')}${section('转向更乐观，需要看到',list(['能源回落，后续核心 PCE 维持温和。','就业和实际需求稳定，盈利兑现且信用止稳。']),'check')}${section('升级再通胀预警，需要看到',list(['核心 PCE 动量和上涨广度持续上升。','成本压力进入更多商品与服务，长期预期也开始跟进。']),'inflation')}${section('转向增长恶化，需要看到',list(['工时、招聘和消费同步转弱，裁员持续增加。','盈利下调扩散，同时信用利差继续扩大。']),'warning')}<div class="notice-inline">这是条件性研究判断，未转换为校准概率。持续再通胀、工资—价格反馈、预期脱锚及衰退均未确认。</div>`;
}

function renderDetail() {
  const [kind,id]=state.activeDetail.split(':');
  let item,title,subtitle,kicker,metricIds=[],sourceIds=[],judgment='';
  if(kind==='topic') {
    item=topicMap.get(id);title=`${item.title}：${item.kicker}`;subtitle=item.summary;kicker=`TRANSMISSION / ${item.id.toUpperCase()}`;metricIds=item.metricIds;sourceIds=item.sourceIds;
    judgment=`${tag(item.status,item.statusTone)}<div style="height:18px"></div>${section('背后的传导逻辑',`<div class="detail-logic">${item.logic.map((x,i)=>`<div><b>${i+1}</b><span>${esc(x)}</span></div>`).join('')}</div>`,'chain')}${section('什么会增强判断',list(item.confirmation),'check')}${section('什么会推翻判断',list(item.falsification),'warning')}${section('数据与解释边界',list(item.caveats),'info')}`;
  } else if(kind==='metric') {
    item=metricMap.get(id);const t=topicMap.get(item.topic);title=item.label;subtitle=item.note;kicker=`INDICATOR / ${t.title}`;metricIds=[id];sourceIds=item.sourceIds;
    judgment=`${detailMetric(item)}${section('它在传导链中的位置',`<p>${esc(t.summary)}</p>`,'chain')}${section('这项判断的反证',list(t.falsification),'warning')}`;
  } else if(kind==='alert') {
    item=DATA.alerts.find(x=>x.id===id);title=item.title;subtitle=item.summary;kicker='RISK WATCH / 研究预警';metricIds=item.metricIds;sourceIds=item.sourceIds;
    judgment=`${tag(item.status,'warning')}<div style="height:17px"></div><div class="detail-highlight warning">${esc(item.evidence)}</div>${section('为什么要警戒',`<p>${esc(topicMap.get(item.topic).summary)}</p>`,'chain')}${section('哪些证据会让警报升级',list(item.confirmation),'warning')}${section('哪些证据会撤销或减弱警报',list(item.falsification),'check')}`;
  } else if(kind==='pricing') {
    item=DATA.pricing.find(x=>x.id===id);title=item.title;subtitle=item.summary;kicker='PRICING EVIDENCE / 定价证据';metricIds=item.metricIds;sourceIds=item.sourceIds;
    judgment=`<div class="detail-highlight">${esc(item.evidence)}</div>${section('可以作出的判断',`<p>${esc(item.summary)}</p>`,'check')}${section('无法从这些数据识别的部分',`<p>${esc(item.limit)}</p>`,'info')}${section('下一步如何验证',list(topicMap.get(item.topic).confirmation),'calendar')}`;
  } else if(kind==='event') {
    item=DATA.calendar.find(x=>x.id===id);title=item.title;subtitle=`${item.at.slice(0,10)} · ${item.timeLabel}`;kicker='VERIFICATION / 计划验证';sourceIds=item.sourceIds;metricIds=topicMap.get(item.topic).metricIds;
    judgment=`<div class="detail-highlight">${esc(item.question)}</div>${section('什么结果支持当前判断',`<p>${esc(item.confirmation)}</p>`,'check')}${section('什么结果需要改写判断',`<p>${esc(item.falsification)}</p>`,'warning')}${section('发布口径与时间',`<p>${esc(item.caution)}</p>`,'clock')}<div class="notice-inline">这是快照时点的计划事件；发布后需检查修订和口径，不能只用一个 headline 数字下结论。</div>`;
  } else if(kind==='source') {
    item=sourceMap.get(id);title=item.name;subtitle=item.note;kicker='PUBLIC SOURCE / 公开来源';sourceIds=[id];metricIds=DATA.metrics.filter(m=>m.sourceIds.includes(id)).map(m=>m.id);judgment=detailSources([id]);
  } else if(kind==='review') {
    title='财报季：检验盈利韧性';subtitle='2026 年 10–11 月 · 持续验证窗口，每周复核';kicker='EARNINGS REVIEW / 盈利验证';metricIds=['earnings-growth','forward-pe','sp500-week','hy-spread'];sourceIds=['factset','fred-sp500','fred-hy'];
    judgment=`<div class="detail-highlight">主情景依赖较高盈利增长能够兑现。本期只有 9% 公司已公布；随着覆盖增加，持续检查预测是否变成利润和现金流。</div>${section('每周更新的证据',list(['已报公司覆盖率，以及板块构成是否足够广。','历史个股盈利修订暂未接入；仅核对公开当期周报与已公布财报，不替代历史修订数据库。','营收量价、利润率、现金流与指引。','信用利差是否止稳，融资压力是否影响盈利。']),'calendar')}${section('什么会支持盈利韧性',list(['更多财报支持既有增长预期，利润率、现金流与指引稳定。','信用压力止稳，股票表现得到更广的行业参与。']),'check')}${section('什么会推翻这一前提',list(['预测下调跨行业扩散，利润率及现金流一起恶化。','高收益债利差继续扩大，企业披露融资和再融资压力。']),'warning')}<div class="notice-inline">这是持续研究窗口，并非某家公司已确认的披露日。公司报告日期以其公告为准；没有预设市场上涨幅度或情景概率。</div>`;
  } else if(kind==='collection') {
    title=id==='anchor'?'10 月末锚点：验收后才可使用':'采集与正式判断的时间';subtitle='真实收取时间 · 版本留存 · 缺失不回填';kicker='PROSPECTIVE COLLECTION';metricIds=[];sourceIds=[];
    judgment=`<div class="detail-highlight">每天美东 09:00 与 23:59 启动采集，跟随 America/New_York 夏令时。正式月度判断仍在第 5 个 NYSE 交易日 09:25 截止。</div>${section('首期时间',list(['观察月：2026 年 10 月；比较基准：2026 年 7 月。','当前官方交易日历下，10 月末锚点为 10/30 收盘。收盘后生效的变更归入下一交易日。','首期 11/06 09:25 EST（台北 22:25）；09:00 采集留出 25 分钟。']),'clock')}${section('名单验收',list(['接收收盘后的完整成分股事件源，逐条核对生效边界，保留来源版本。','核对永久证券 ID、不同股类及完整 200 个交易日的价格身份连续性。','未知成员或缺失价格进入保守上下界；不能删除未知股票来改善广度。','在截点前完成实际验收并追加账本；未完成为 UNKNOWN。']),'shield')}${section('迟到与缺失',list(['23:59 是启动时间，若次日 00:01 收完，该版本最早可用时间就是次日。','原始文件、哈希、开始和完成时间分别保留；不把文件修改时间当发布时间。','缺失不等于正常或无风险；不填零、不替换成上一月、不事后回填正式判断。','任务依赖本机及应用运行；当前网页为发布快照，不显示为实时连接。']),'info')}<div class="notice-inline">正式实验准备快照（10/18）：9 张收取凭证、0 条正式判断；此为当次快照，后续采集继续留存本地。10 月末名单及月度数据尚未验收。每天两次任务同时核对研究预测的新证据，重大变化才追加观点版本；不自动重跑历史检验。</div>`;
  } else if(kind==='audit') {
    title='本期金融核验';subtitle='2026-10-18 · 事实、计算与结论边界';kicker='FINANCIAL REVIEW';metricIds=['cpi-core-3m','pce-core-3m','ust-10y','real-10y','hy-spread','sp500-week','earnings-growth','nasdaq-week'];sourceIds=[...new Set(metricIds.flatMap(x=>metricMap.get(x).sourceIds))];
    judgment=`<div class="detail-highlight">主要观察沿用最近已公布的数据。复核日期更新，不表示观察期已更新；当前研究观点不写入 11 月首期正式判断。</div>${section('计算检查',list(['核心CPI：100×[(338.896/336.065)^4−1]=3.4124%；端点9月与6月。','核心PCE：100×[(130.455/129.796)^4−1]=2.0464%；端点8月与5月。','收益率：5.09%−5.24%=−15bp；实际收益率2.74%−2.91%=−17bp。','名义减实际：5.09%−2.74%=2.35%，近一周+2bp；含风险与流动性补偿。','标普周回报：7659.44÷7811.54−1≈−1.95%，不含分红。','信用变化：HY323−270=+53bp；IG84−78=+6bp，比较窗口9/17—10/15。']),'check')}${section('金融解释修正',list(['Fed已向收紧方向调整；名义目标利率的高低不足以单独证明政策强限制性。','FactSet29%是已报与未报预测混合盈利增速，仅9%公司已报，不能称已经实现。','信用观察日为10/15，发布更新日为10/16；周度利率与约月度信用变化不可当同期冲击。','收益率回落与股价下跌同时发生，无法用本周实际利率上行解释股价下跌。']),'shield')}${section('历史检验结论',list(['封存的86个成熟月份中，信用T与信用+广度TB信号相同，都是7个误报月、6个漏报月。','旧行业组合TC为4个误报月、6个漏报月。TB新增3个误报，尚未证明增量价值。','事件提前量只针对首次跨过−15%月末回撤阈值，均晚于2021-12月末峰值，不是提前抓顶。','旧历史全部为已看过的开发样本；识别上下界不是统计置信区间。']),'clock')}<div class="notice-inline">本轮12项计算复算一致，25项指标核验通过；纳指全周一手终点未核验，记UNKNOWN。具体原始端点、核验状态和未覆盖项见“指标数据”。市场已计价百分比、完整盈利修订历史及尚未验收的前瞻广度保持 UNKNOWN。</div>`;
  } else if(kind==='scenario') {
    title=DATA.snapshot.title;subtitle='未来 1–6 个月 · 当前工作判断';kicker='BASE CASE / 主情景';metricIds=['cpi-core-3m','pce-core-3m','fed-range','claims','real-10y','hy-spread','earnings-growth'];sourceIds=[...new Set(metricIds.flatMap(x=>metricMap.get(x).sourceIds))];judgment=scenarioContent();
  } else {
    title='数据口径与独立 QA';subtitle='把事实、推断和仍待验证的部分分开。';kicker='RESEARCH DISCIPLINE / 研究纪律';metricIds=DATA.metrics.map(x=>x.id);sourceIds=DATA.sources.map(x=>x.id);
    judgment=`<div class="detail-highlight">这是 2026 年 10 月 18 日复核的发布快照。指标各自标注观察期和核验状态；本地定时采集已启用，网页尚未与账本实时同步。</div>${DATA.qa.map(q=>section(q.title,`<p>${esc(q.text)}</p>`,'shield')).join('')}${section('时间与计算',list(['国债与股票采用美国交易日；验证日历采用 Asia/Taipei。','三个月年化 = 100 × [(本月指数 / 三个月前指数)^4 − 1]，以同版本季调指数计算。','1 个百分点 = 100bp；收益率、收益率变化和股票回报分别命名。','图表只连接 09/16、10/09、10/16 三个核验点，并非完整日线。']),'clock')}`;
  }
  const body=state.detailTab==='metrics'?metricIds.map(id=>detailMetric(metricMap.get(id))).join(''):state.detailTab==='sources'?detailSources(sourceIds):judgment;
  const focusedTab=detail.contains(document.activeElement)?document.activeElement?.dataset?.tab:null;
  detail.innerHTML=`<header class="detail-header"><div class="eyebrow">${esc(kicker)}</div><button type="button" class="close-button" data-action="close-detail" aria-label="关闭详情">${icon('close')}</button><h2 id="detail-title">${esc(title)}</h2><p>${esc(subtitle)}</p></header><div class="detail-tabs" role="tablist" aria-label="详情内容">${[['judgment','判断与传导'],['metrics',`指标数据 · ${metricIds.length}`],['sources','公开来源']].map(([key,label])=>`<button type="button" class="detail-tab ${state.detailTab===key?'active':''}" id="detail-tab-${key}" data-tab="${key}" role="tab" aria-selected="${state.detailTab===key}" aria-controls="detail-panel" tabindex="${state.detailTab===key?'0':'-1'}">${label}</button>`).join('')}</div><div class="detail-body" id="detail-panel" role="tabpanel" aria-labelledby="detail-tab-${state.detailTab}" tabindex="0">${body||'<div class="empty-state">本项没有独立指标，请查看公开来源。</div>'}</div><div class="detail-footer">${icon('shield')}复核快照 · 2026.10.18　｜　各项数据日期以指标卡为准</div>`;
  if(focusedTab)detail.querySelector(`[data-tab="${state.detailTab}"]`)?.focus();
}

function openDetail(key,trigger=document.activeElement) {
  state.lastTrigger=searchDialog.contains(trigger)?document.querySelector('[data-action="search"]'):trigger?.closest('.sidebar')&&window.matchMedia('(max-width: 740px)').matches?document.querySelector('[data-action="menu"]'):trigger;
  state.activeDetail=key;state.detailTab='judgment';renderDetail();
  setMobile(false);if(searchDialog.open)searchDialog.close();
  if(!detail.open)detail.showModal();
  detail.querySelector('.close-button')?.focus();
  document.body.style.overflow='hidden';
}

detail.addEventListener('close',()=>{document.body.style.overflow='';if(state.lastTrigger?.isConnected)state.lastTrigger.focus({preventScroll:true});});
detail.addEventListener('click',e=>{if(e.target===detail){const r=detail.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)detail.close();}});
detail.addEventListener('keydown',e=>{
  if(e.target.matches('[role="tab"]')&&['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
    e.preventDefault();const keys=['judgment','metrics','sources'];let i=keys.indexOf(state.detailTab);i=e.key==='Home'?0:e.key==='End'?2:(i+(e.key==='ArrowRight'?1:-1)+3)%3;state.detailTab=keys[i];renderDetail();detail.querySelector(`[data-tab="${state.detailTab}"]`).focus();
  }
});

function searchResults(query='') {
  const q=query.trim().toLowerCase();
  const matches=DATA.metrics.filter(m=>`${m.label} ${m.note} ${m.period} ${m.id}`.toLowerCase().includes(q)).slice(0,8);
  const sources=q?DATA.sources.filter(s=>`${s.name} ${s.publisher}`.toLowerCase().includes(q)).slice(0,4):[];
  const result=matches.map(m=>`<button type="button" class="search-result" data-detail="metric:${m.id}">${icon(m.topic)}<div><strong>${esc(m.label)}</strong><span>${esc(m.period)}</span></div><b class="num">${esc(m.value)}<span> ${esc(m.unit)}</span></b></button>`).join('')+sources.map(s=>`<button type="button" class="search-result" data-detail="source:${s.id}">${icon('book')}<div><strong>${esc(s.name)}</strong><span>${esc(s.publisher)} · 公开来源</span></div>${icon('arrow','icon-sm')}</button>`).join('');
  document.getElementById('search-results').innerHTML=result||'<div class="empty-state">没有找到匹配内容，试试 “CPI”“利率” 或 “盈利”。</div>';
}

function openSearch() {
  if(detail.open)detail.close();
  searchDialog.innerHTML=`<div class="search-top">${icon('search')}<input id="global-search" type="search" placeholder="查找指标、机构与公开来源…" aria-label="查找指标与来源" autocomplete="off"><button type="button" data-action="close-search" aria-label="关闭查找"><kbd>ESC</kbd></button></div><div id="search-results" class="search-results"></div><div class="search-foot">${DATA.metrics.length} 个跟踪指标（25 已核验 · 1 UNKNOWN） · ${DATA.sources.length} 个来源 · 2026.10.18 复核</div>`;
  searchResults();searchDialog.showModal();document.getElementById('global-search').focus();
}
searchDialog.addEventListener('click',e=>{if(e.target===searchDialog)searchDialog.close();});

function showToast(message) {
  const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('visible');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('visible'),3200);
}

function exportReport() {
  const lines=['Polo’s market notes · Polo 的市场解读',DATA.snapshot.asOfLabel,'本期金融复核快照；本地采集每天美东09:00、23:59，网页未与账本实时同步。','',DATA.snapshot.title,DATA.snapshot.thesis,DATA.snapshot.summary,'','【传导链分析】'];
  DATA.topics.forEach(t=>{lines.push('',t.title+' · '+t.status,t.summary,'传导逻辑：',...t.logic.map(x=>'· '+x),'增强判断：',...t.confirmation.map(x=>'· '+x),'撤销判断：',...t.falsification.map(x=>'· '+x));});
  lines.push('','【指标快照】');DATA.metrics.forEach(m=>lines.push(`${m.label}：${m.value} ${m.unit}；${m.change}`,`观察期：${m.period}；公开发布/更新：${m.releasedAt}`,m.note,...m.sourceIds.map(id=>sourceMap.get(id).url),''));
  lines.push('【持续验证窗口】','2026 年 10–11 月财报季，每周复核已报覆盖率、公开盈利预期、利润率、现金流和指引；历史个股盈利修订暂未接入。具体披露日以公司公告为准。','');
  lines.push('【验证日历 · 台北时间】');DATA.calendar.forEach(e=>lines.push(`${e.at.slice(0,10)} ${e.timeLabel} · ${e.title}`,e.question,'支持：'+e.confirmation,'推翻：'+e.falsification,'注意：'+e.caution,''));
  lines.push('【本期金融核验】','25项现况指标核验通过；1项UNKNOWN；12项算术复算一致；不是模型成功率。',...DATA.review.limits,'完整复核：'+new URL('./financial-review.json',document.baseURI).href,'',...reviewStatusReportLines(),
    ...forecastReportLines(FORECAST),'','【独立轨道：正式实验与条件推演】',...outlookReportLines(),...historyReportLines(),'【研究口径】',...DATA.qa.map(q=>q.title+'：'+q.text),'','【公开来源】',...DATA.sources.map(s=>`${s.publisher} · ${s.name}\n${s.url}\n观察至 ${s.observedThrough}；核验 ${s.accessedAt}\n${s.note}\n`));
  const blob=new Blob(['\uFEFF'+lines.join('\n')],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`Polo-market-notes-${FORECAST.date}.txt`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast('已导出含指标、反证与来源的完整报告');
}

document.addEventListener('click',e=>{
  const btn=e.target.closest('button,[data-detail]');if(!btn)return;
  if(btn.hasAttribute('data-forecast-jump')){document.getElementById('forecast-revisions')?.scrollIntoView({behavior:'smooth'});return;}
  if(btn.hasAttribute('data-outlook-reset')){outlookInputs={...ACTUAL_INPUTS};outlookSimulated=false;document.querySelectorAll('[data-outlook-input]').forEach(s=>s.value='UNKNOWN');document.getElementById('outlook-result').innerHTML=outlookResult(outlookInputs,false);return;}
  if(btn.dataset.historyCase){state.historyCase=btn.dataset.historyCase;renderView();document.querySelector(`[data-history-case="${state.historyCase}"]`)?.focus({preventScroll:true});return;}
  if(btn.dataset.view){navigate(btn.dataset.view);return;}
  if(btn.dataset.detail){openDetail(btn.dataset.detail,btn);return;}
  if(btn.dataset.tab){state.detailTab=btn.dataset.tab;renderDetail();return;}
  if(btn.dataset.filter){state.filter=btn.dataset.filter;renderView();document.querySelector(`[data-filter="${state.filter}"]`)?.focus();return;}
  switch(btn.dataset.action){case 'search':openSearch();break;case 'close-detail':detail.close();break;case 'close-search':searchDialog.close();break;case 'export':exportReport();break;case 'menu':setMobile(!state.mobileOpen);break;}
});

document.addEventListener('change',e=>{
  const key=e.target.dataset.outlookInput;
  if(key){outlookInputs[key]=e.target.value;outlookSimulated=true;document.getElementById('outlook-result').innerHTML=outlookResult(outlookInputs,true);}
});

document.addEventListener('input',e=>{
  if(e.target.id==='global-search')searchResults(e.target.value);
  if(e.target.id==='source-search'){
    const cursor=e.target.selectionStart;state.sourceQuery=e.target.value;renderView();const input=document.getElementById('source-search');input.focus({preventScroll:true});try{input.setSelectionRange(cursor,cursor);}catch{}
  }
});

document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}
  if(e.key==='Escape'&&state.mobileOpen)setMobile(false);
});
window.addEventListener('hashchange',()=>navigate(location.hash.slice(1)||'overview',false));
window.matchMedia('(max-width: 740px)').addEventListener('change',()=>{setMobile(false);syncNavAccessibility();});
let chartObserver;
state.view=['overview','chain','calendar','sources','history','outlook'].includes(location.hash.slice(1))?location.hash.slice(1):'overview';
shell();
