import { evidenceV5View, evidenceV5ReportLines } from './evidence-v5.js';
import { sp500RebuildView, sp500RebuildReportLines } from './sp500-rebuild.js';
// Analyst target presentation. All targets and valuation assumptions are supplied
// by the saved research record; this renderer does not estimate financial inputs.
import { sensitivityView, sensitivityReportLines } from './sensitivity.js';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const list = value => Array.isArray(value) ? value : [];
const number = value => typeof value === 'number' && Number.isFinite(value) ? value : null;
const level = value => number(value) === null ? String(value ?? '待核实') : value.toLocaleString('en-US',{maximumFractionDigits:2});
const assumption = value => typeof value === 'number' ? level(value) : String(value ?? '未列出');
const url = value => /^https?:\/\//i.test(String(value ?? '')) ? esc(value) : '#';

function returnFromReference(target, reference) {
  if (number(target) === null || number(reference) === null || reference <= 0) return null;
  return (target / reference - 1) * 100;
}

function returnText(value) {
  if (value === null) return '基准不足，暂不计算';
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return `${rounded > 0 ? '+' : ''}${Object.is(rounded,-0) ? '0.00' : rounded.toFixed(2)}%`;
}

function sources(ids,map) {
  const selected = [...new Set(list(ids))].map(id => map.get(id)).filter(Boolean);
  if (!selected.length) return '';
  return `<div class="targets-sources" aria-label="来源与日期">${selected.map(source => `<a href="${url(source.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.name)} <span aria-hidden="true">↗</span></span><small>${esc(source.date)}</small></a>`).join('')}</div>`;
}

function bullets(items) {
  return `<ul>${list(items).map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function targetCard(index, targets, sourceIndex) {
  const noPoint = index.priceTargetStatus === 'WITHDRAWN_POINT';
  const reference = index.reference ?? {};
  const central = index.central ?? {};
  const range = list(index.mainRange);
  const priceReturn = returnText(returnFromReference(central.level,reference.level));
  const earningsLabel = central.earningsLabel || '盈利假设';
  const multipleLabel = central.multipleLabel || '估值假设';
  return `<article class="card targets-index-card" aria-label="${esc(index.name)}目标点位">
    <div class="targets-index-top"><span class="targets-symbol">${esc(index.symbol)}</span><span class="targets-date">${noPoint?"估值时点":"目标"} ${esc(targets.targetDate)}</span></div>
    <h3>${esc(index.name)}</h3><div class="targets-central-label">${esc(index.centralLabel || "分析师主情景 · 中心点位")}</div><div class="targets-central">${esc(central.displayLevel || level(central.level))}${noPoint?'':'<small>点</small>'}</div>
    <div class="targets-range"><span>${esc(index.rangeLabel || "主情景敏感区间")}</span><strong>${index.mainRangeDisplay ? esc(index.mainRangeDisplay) : range.length === 2 ? `${esc(level(range[0]))}–${esc(level(range[1]))}` : '未列出'}${range.length === 2 ? '<small> 点</small>' : ''}</strong></div>
    <p class="targets-range-note">${esc(index.rangeNote || "分析师假设下的敏感区间，非统计置信区间；与下方牛熊情景点位分开。")}</p>
    <div class="targets-return"><span>${noPoint?"年底工作判断":"中心点位隐含价格回报"}</span><strong>${noPoint?esc(index.directionalView || "震荡 · 低把握"):esc(priceReturn)}</strong></div>
    <p class="targets-reference">${noPoint?esc(index.withdrawalNote || "缺乏独立支撑的单点已撤销；条件推演不是年底必落区间。"):"中心计算值 "+esc(level(central.level))+" 点；回报按未舍入值计算。"}<br>基准 ${esc(level(reference.level))} 点 · ${esc(reference.date)}<br>${esc(reference.label)}；不含分红。</p>
    <div class="targets-method"><span>计算方法</span><p>${esc(index.method)}</p></div>
    <div class="targets-assumption-pair"><div><span>${esc(earningsLabel)}</span><strong>${esc(assumption(central.eps))}</strong></div><div><span>${esc(multipleLabel)}</span><strong>${esc(assumption(central.pe))}</strong></div></div>
    <p class="targets-assumption-note">${esc(index.assumptionNote || "上面两项及所有情景点位均为分析师假设；公开来源用于核对事实与约束。")}</p>
    <div class="targets-confidence">判断把握：${esc(index.confidence)}</div>
    <details class="targets-detail"><summary>展开 EPS × 估值、情景与反证</summary><div class="targets-detail-body">
      <div class="targets-calculation"><span>从假设到点位</span><p>${esc(index.method)}</p><div>${esc(earningsLabel)}：${esc(assumption(central.eps))}<br>${esc(multipleLabel)}：${esc(assumption(central.pe))}<br>${noPoint?"无当前中心点位；旧单点已撤销":"中心点位："+esc(level(central.level))}</div><small>${noPoint?"条件组合没有赋予概率，也没有假定年底前市场收敛；计算器结果不是新目标。":`隐含价格回报 = (${esc(level(central.level))} ÷ ${esc(level(reference.level))} − 1) × 100% = ${esc(priceReturn)}。以明确日期的基准计算；目标不是保证回报。`}</small></div>
      <h4>${noPoint?"条件价值 · 无概率与收敛承诺":"情景点位 · 无概率权重"}</h4><div class="targets-table-wrap"><table><thead><tr><th scope="col">情景</th><th scope="col">${esc(earningsLabel)}</th><th scope="col">${esc(multipleLabel)}</th><th scope="col">点位</th></tr></thead><tbody>${list(index.scenarios).map(scenario => `<tr><th scope="row">${esc(scenario.label)}</th><td>${esc(assumption(scenario.earnings))}</td><td>${esc(assumption(scenario.pe))}</td><td>${esc(level(scenario.target))}</td></tr>`).join('')}</tbody></table></div>
      <div class="targets-scenario-reasons">${list(index.scenarios).map(scenario => `<p><strong>${esc(scenario.label)}</strong>${esc(scenario.reason)}</p>`).join('')}</div>
      <h4>盈利假设为什么这样设</h4>${bullets(index.earningsRationale)}
      <h4>估值倍数为什么这样设</h4>${bullets(index.multipleRationale)}
      <h4>哪些证据会推翻目标</h4>${bullets(index.falsifiers)}
      <h4>口径与局限</h4>${bullets(index.limits)}
      <h4>参考点位与研究来源</h4>${sources([...list(reference.sourceIds),...list(index.sourceIds)],sourceIndex)}
    </div></details>
  </article>`;
}

export function targetsView(targets) {
  const sourceIndex = new Map(list(targets.sources).map(source => [source.id,source]));
  return `<section class="targets-page" aria-label="指数目标点位研究">
    <div class="targets-heading"><div><span class="targets-eyebrow">BUY-SIDE / 目标点位与估值假设</span><h2>${esc(targets.title)}</h2><p>${esc(targets.summary)}</p></div><div class="targets-datestamp"><span>观点日期</span><strong>${esc(targets.asOf)}</strong><span>目标时点</span><strong>${esc(targets.targetDate)}</strong></div></div>
    <div class="targets-method-note"><span>口径先行</span><p>${esc(targets.methodNote)}</p></div>
    <div class="targets-index-grid">${list(targets.indices).map(index => targetCard(index,targets,sourceIndex)).join('')}</div>
    ${targets.evidenceV5 ? evidenceV5View(targets.evidenceV5) : sp500RebuildView(targets.sp500Rebuild,targets.sources)}
    ${sensitivityView(targets.sensitivity,targets.sources)}
    <div class="section-heading targets-section-heading"><h2>共同驱动，怎样传到点位</h2><span>政策 → 盈利与估值 → 指数</span></div>
    <div class="targets-drivers">${list(targets.sharedDrivers).map((driver,i) => `<article class="card targets-driver"><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(driver.name)}</h3><p>${esc(driver.transmission)}</p></article>`).join('')}</div>
    <details class="card targets-update"><summary>什么时候调整目标，以及完整来源</summary><div class="targets-update-body"><div><h3>目标更新纪律</h3>${bullets(targets.updatePolicy)}<p class="targets-export-note">导出采用这份已保存的目标记录，不读取页面中的假设模拟状态。</p></div><div><h3>本版全部证据来源</h3>${sources(list(targets.sources).map(source => source.id),sourceIndex)}</div></div></details>
  </section>`;
}

export function targetsReportLines(targets) {
  return [
    '【指数目标点位研究 · 分析师假设】',
    `观点日期：${targets.asOf}；目标时点：${targets.targetDate}`,
    targets.title,targets.summary,`口径说明：${targets.methodNote}`,
    '主情景敏感区间来自分析师假设，不是统计置信区间。牛熊情景点位独立列示，无概率权重。',
    ...list(targets.indices).flatMap(index => {
      const noPoint = index.priceTargetStatus === 'WITHDRAWN_POINT';
      const reference = index.reference ?? {};
      const central = index.central ?? {};
      return [
        `【${index.name} / ${index.symbol}】`,
        `计算方法：${index.method}`,`判断把握：${index.confidence}`,
        `参考点位：${level(reference.level)}；日期：${reference.date}；口径：${reference.label}`,
        noPoint ? `精确单点撤销；条件价值范围：${index.mainRangeDisplay || list(index.mainRange).map(level).join('–')}。${index.rangeNote}` : `主情景中心点位显示：${central.displayLevel || level(central.level)}；未舍入计算值：${level(central.level)}；敏感区间：${list(index.mainRange).map(level).join('–')}`,
        noPoint ? `年底工作判断：${index.directionalView || "震荡、方向把握低"}；无当前单点回报预测。` : `中心点位隐含价格回报（不含分红）：(${level(central.level)} / ${level(reference.level)} - 1) × 100% = ${returnText(returnFromReference(central.level,reference.level))}`,
        `${noPoint?"数据输入":"分析师假设"} ${central.earningsLabel || '盈利假设'}：${assumption(central.eps)}`,
        `分析师假设 ${central.multipleLabel || '估值假设'}：${assumption(central.pe)}`,
        ...list(index.scenarios).map(scenario => `情景 ${scenario.label}：${central.earningsLabel || '盈利假设'}=${assumption(scenario.earnings)}；${central.multipleLabel || '估值假设'}=${assumption(scenario.pe)}；${noPoint?"条件价值":"目标"}=${level(scenario.target)}。${scenario.reason}`),
        ...list(index.earningsRationale).map(text => `盈利依据：${text}`),
        ...list(index.multipleRationale).map(text => `倍数依据：${text}`),
        ...list(index.falsifiers).map(text => `推翻条件：${text}`),
        ...list(index.limits).map(text => `口径局限：${text}`)
      ];
    }),
    ...(targets.evidenceV5 ? evidenceV5ReportLines(targets.evidenceV5) : sp500RebuildReportLines(targets.sp500Rebuild,targets.sources)),
    ...sensitivityReportLines(targets.sensitivity,targets.sources),
    ...list(targets.sharedDrivers).map(driver => `共同驱动 ${driver.name}：${driver.transmission}`),
    ...list(targets.updatePolicy).map(text => `目标更新纪律：${text}`),
    '【目标研究来源与日期】',
    ...list(targets.sources).map(source => `${source.name}｜${source.date}｜${source.url}`)
  ].filter(value => value !== null && value !== undefined).map(String);
}
