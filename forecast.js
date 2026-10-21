import { targetsView, targetsReportLines } from './targets.js';
// Research-view presentation only. No model inputs, probabilities, or ledger writes.
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const list = value => Array.isArray(value) ? value : [];
const sourceMap = forecast => new Map(list(forecast.sources).map(source => [source.id, source]));
const sourceUrl = value => /^https?:\/\//i.test(String(value ?? '')) ? esc(value) : '#';

function sources(ids, map) {
  const entries = [...new Set(list(ids))].map(id => map.get(id)).filter(Boolean);
  if (!entries.length) return '';
  return `<div class="forecast-citations" aria-label="证据来源与日期">${entries.map(source => `<a href="${sourceUrl(source.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.name)} <span aria-hidden="true">↗</span></span><small>${esc(source.date)}</small></a>`).join('')}</div>`;
}

function heading(title, note = '') {
  return `<div class="section-heading forecast-section-heading"><h2>${esc(title)}</h2>${note ? `<span>${esc(note)}</span>` : ''}</div>`;
}

function horizonCard(horizon) {
  return `<article class="card forecast-horizon"><div class="forecast-card-top"><span class="forecast-eyebrow">${esc(horizon.label)}</span><span class="forecast-window">${esc(horizon.window)}</span></div><h3>${esc(horizon.stance)}</h3><dl class="forecast-path">${[['policy','政策'],['rates','利率'],['equities','股票']].map(([key,label]) => `<div><dt>${label}</dt><dd>${esc(horizon[key])}</dd></div>`).join('')}</dl><details class="forecast-inline-details"><summary>什么会推翻这段判断</summary><p>${esc(horizon.invalidate)}</p></details></article>`;
}

export function forecastView(forecast) {
  const map = sourceMap(forecast);
  return `<div class="forecast-page">
    <section class="card forecast-hero" aria-label="当前主观点">
      <div class="forecast-hero-main"><div class="forecast-hero-top"><span class="forecast-eyebrow">WORKING FORECAST / 未来 1–6 个月</span><span class="forecast-version">${esc(forecast.version)} · ${esc(forecast.reviewStatus)}</span></div><h2>${esc(forecast.headline).replace(/\n/g,'<br>')}</h2><p class="forecast-summary">${esc(forecast.summary)}</p><div class="forecast-confidence"><span>判断把握</span><strong>${esc(forecast.confidence)}</strong></div></div>
      <aside class="forecast-dates" aria-label="观点与证据日期"><dl><div><dt>观点建立日期</dt><dd>${esc(forecast.date)}</dd></div><div><dt>本页发布的证据复核</dt><dd>${esc(forecast.lastEvidenceCheck)}</dd></div><div><dt>市场数据截至</dt><dd class="forecast-market-through">${esc(forecast.marketThrough)}</dd></div></dl><p>数据持续更新。只有关键前提改变，才调整观点并追加版本。</p><span class="forecast-jump">调整规则与版本记录见下方 <span aria-hidden="true">↓</span></span></aside>
    </section>
    ${forecast.marketTargets ? targetsView(forecast.marketTargets) : ''}
    <section class="forecast-horizons" aria-label="近期与中期预测">${list(forecast.horizons).map(horizonCard).join('')}</section>
    <details class="card forecast-assumptions"><summary>主情景依赖的三个前提与买方含义</summary><div class="forecast-assumptions-body"><ol>${list(forecast.mainAssumptions).map(assumption => `<li>${esc(assumption)}</li>`).join('')}</ol><p>${esc(forecast.positioning)}</p></div></details>

    ${heading('从三张研究桌，看同一组证据','判断不是数据本身；同时写下反证')}
    <section class="forecast-perspectives" aria-label="Fed、宏观与买方视角">${list(forecast.perspectives).map(perspective => `<article class="card forecast-perspective"><span class="forecast-eyebrow">${esc(perspective.role)}</span><h3>${esc(perspective.title)}</h3><p class="forecast-judgment">${esc(perspective.judgment)}</p><div class="forecast-evidence"><span>依据</span><p>${esc(perspective.evidence)}</p></div><details class="forecast-inline-details"><summary>反向证据与一手来源</summary><p>${esc(perspective.counter)}</p>${sources(perspective.sourceIds,map)}</details></article>`).join('')}</section>

    ${heading('六个 component，怎样支撑当前判断','事实 → 传导 → 对观点的影响')}
    <section class="forecast-components" aria-label="预测证据组件">${list(forecast.components).map((component,index) => `<article class="card forecast-component"><div class="forecast-card-top"><span class="forecast-component-index">${String(index + 1).padStart(2,'0')}</span><span class="forecast-reading ${component.tone === 'warning' ? 'is-warning' : 'is-neutral'}">${esc(component.reading)}</span></div><h3>${esc(component.name)}</h3><div class="forecast-component-fact"><span class="forecast-label">已知事实</span><p>${esc(component.fact)}</p><small>${esc(component.date)}</small></div><div class="forecast-implication"><span class="forecast-label">我的解读</span><p>${esc(component.implication)}</p></div>${list(component.sourceIds).length ? `<details class="forecast-inline-details"><summary>核对来源与数据日期</summary>${sources(component.sourceIds,map)}</details>` : '<div class="forecast-gap">证据尚未齐备；降低把握，不代填确认。</div>'}</article>`).join('')}</section>

    <section class="card forecast-pricing" aria-label="市场计价与观点差异"><div class="forecast-pricing-main"><span class="forecast-eyebrow">MARKET PRICING / 市场计价</span><h3>${esc(forecast.pricing?.title)}</h3><p>${esc(forecast.pricing?.known)}</p><div class="forecast-pricing-difference"><span class="forecast-label">我的观点与旧计价的差别</span><p>${esc(forecast.pricing?.difference)}</p></div></div><div class="forecast-pricing-evidence"><span class="forecast-label">有日期的计价证据</span><p>${esc(forecast.pricing?.datedEvidence)}</p>${sources(forecast.pricing?.sourceIds,map)}</div></section>

    ${heading('情景如何分岔','不设未经校准的概率；条件改变才切换')}
    <section class="forecast-scenarios" aria-label="主情景与其他路径">${list(forecast.scenarios).map(scenario => `<article class="card forecast-scenario ${scenario.id === 'base' ? 'is-base' : ''}"><div class="forecast-card-top"><span class="forecast-eyebrow">${esc(scenario.label)}</span>${scenario.id === 'base' ? '<span class="forecast-base-dot" aria-hidden="true"></span>' : ''}</div><h3>${esc(scenario.title)}</h3><p class="forecast-scenario-rank">${esc(scenario.rank)}</p><p class="forecast-scenario-stock">${esc(scenario.stocks)}</p><details class="forecast-inline-details"><summary>政策、利率与切换证据</summary><dl class="forecast-scenario-path"><div><dt>政策</dt><dd>${esc(scenario.policy)}</dd></div><div><dt>利率</dt><dd>${esc(scenario.rates)}</dd></div></dl><span class="forecast-label">切换／维持依据</span><p>${esc(scenario.switchEvidence)}</p>${sources(scenario.sourceIds,map)}</details></article>`).join('')}</section>

    ${heading('每天更新证据，不每天重写预测','重大变化才改变观点版本')}
    <section id="forecast-revisions" class="forecast-change-rules" aria-label="观点调整规则">${list(forecast.changeRules).map((rule,index) => `<article class="card forecast-change-rule"><span class="forecast-rule-step">0${index + 1} / ${esc(rule.status)}</span><h3>${esc(rule.label)}</h3><p>${esc(rule.rule)}</p></article>`).join('')}</section>

    ${heading('接下来，什么数据最能改变判断','按发布时间核对，不预先假定结果')}
    <section class="card forecast-catalysts" aria-label="预测验证日历"><div class="forecast-catalyst-head" aria-hidden="true"><span>时间</span><span>催化事件</span><span>真正要回答的问题</span></div>${list(forecast.catalysts).map(catalyst => `<article class="forecast-catalyst"><div class="forecast-catalyst-date">${esc(catalyst.date)}</div><h3>${esc(catalyst.event)}</h3><p>${esc(catalyst.question)}</p></article>`).join('')}</section><p class="forecast-calendar-source"><a href="#calendar">查看已核验的完整日历与官方来源 ↗</a></p>

    <details class="card forecast-records"><summary>版本历史、边界与完整来源</summary><div class="forecast-records-body"><div class="forecast-version-history"><h3>观点版本历史</h3>${list(forecast.history).map(entry => `<article><div><span>${esc(entry.date)}</span><b>${esc(entry.version)}</b></div><h4>${esc(entry.action)}</h4><p>${esc(entry.reason)}</p></article>`).join('')}</div><div class="forecast-limits"><h3>怎样理解这份预测</h3><ul>${list(forecast.limits).map(limit => `<li>${esc(limit)}</li>`).join('')}</ul><p class="forecast-record-id">记录 ${esc(forecast.id)}${forecast.createdAtUtc ? `<br>创建时间（UTC）${esc(forecast.createdAtUtc)}` : ''}</p><a class="forecast-file-link" href="./forecast.json" target="_blank" rel="noopener noreferrer">本版结构化研究记录 ↗</a></div><div class="forecast-all-sources"><h3>本版全部证据来源</h3>${sources(list(forecast.sources).map(source => source.id),map)}</div></div></details>
  </div>`;
}

// The export is generated from the saved research record only; UI simulations
// are never read or accepted by this function.
export function forecastReportLines(forecast) {
  return [
    '【研究预测 · 当前主观点】',
    `观点日期：${forecast.date}；版本：${forecast.version}；本页发布的证据复核：${forecast.lastEvidenceCheck}`,
    `市场数据截至：${forecast.marketThrough}`,
    `记录：${forecast.id}${forecast.createdAtUtc ? `；创建时间（UTC）：${forecast.createdAtUtc}` : ''}`,
    String(forecast.headline ?? '').replace(/\n/g,' '),
    forecast.summary,
    ...(forecast.marketTargets ? targetsReportLines(forecast.marketTargets) : []),
    `判断把握：${forecast.confidence}`,
    ...list(forecast.mainAssumptions).map(assumption => `主情景前提：${assumption}`),
    forecast.positioning,
    ...list(forecast.horizons).flatMap(horizon => [
      `【${horizon.label} · ${horizon.window}】${horizon.stance}`,
      `政策：${horizon.policy}`, `利率：${horizon.rates}`, `股票：${horizon.equities}`, `推翻条件：${horizon.invalidate}`
    ]),
    ...list(forecast.perspectives).flatMap(perspective => [
      `【${perspective.title}】${perspective.judgment}`, `依据：${perspective.evidence}`, `反向证据：${perspective.counter}`
    ]),
    ...list(forecast.components).flatMap(component => [
      `【${component.name}】${component.reading}`, `事实：${component.fact}`, `日期：${component.date}`, `解读：${component.implication}`
    ]),
    `【市场计价】${forecast.pricing?.title ?? ''}`,
    forecast.pricing?.known, forecast.pricing?.datedEvidence, forecast.pricing?.difference,
    ...list(forecast.scenarios).flatMap(scenario => [
      `【${scenario.label}】${scenario.title} · ${scenario.rank}`, `政策：${scenario.policy}`, `利率：${scenario.rates}`,
      `股票：${scenario.stocks}`, `切换／维持证据：${scenario.switchEvidence}`
    ]),
    ...list(forecast.changeRules).map(rule => `观点调整规则 ${rule.status} / ${rule.label}：${rule.rule}`),
    `验证日历依据：${forecast.calendarEvidence ?? ''}`,
    ...list(forecast.catalysts).map(catalyst => `验证日历 ${catalyst.date} / ${catalyst.event}：${catalyst.question}`),
    ...list(forecast.history).map(entry => `版本历史 ${entry.date} / ${entry.version} / ${entry.action}：${entry.reason}`),
    ...list(forecast.limits),
    '【研究证据来源与日期】',
    ...list(forecast.sources).map(source => `${source.name}｜${source.date}｜${source.url}`)
  ].filter(value => value !== null && value !== undefined).map(String);
}
