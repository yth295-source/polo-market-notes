// Deterministic valuation sensitivity, using only the saved research inputs.
// Cell values are arithmetic scenarios, not fitted forecasts or probabilities.
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
const list = value => Array.isArray(value) ? value : [];
const finite = value => typeof value === 'number' && Number.isFinite(value);
const format = (value,digits = 2) => finite(value) ? value.toLocaleString('en-US',{maximumFractionDigits:digits}) : '待核实';
const exact = value => finite(value) ? value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}) : '待核实';
const valueText = value => finite(value) ? format(value,4) : String(value ?? '未列出');
const near = (a,b) => finite(a) && finite(b) && Math.abs(a-b) <= 1e-10;
const sourceUrl = value => /^https?:\/\//i.test(String(value ?? '')) ? esc(value) : '#';

function cellValue(model,earnings,multiple) {
  if (!finite(earnings) || !finite(multiple)) return null;
  if (model.kind === 'absolute') return earnings * multiple;
  const reference = model.reference?.level;
  if (model.kind === 'relative' && finite(reference) && reference > 0) return reference * (earnings / 100) * multiple;
  return null;
}

function priceReturn(value,reference) {
  if (!finite(value) || !finite(reference) || reference <= 0) return null;
  return (value / reference - 1) * 100;
}

function percent(value) {
  if (!finite(value)) return '无法计算回报';
  // Financial display uses symmetric half-away-from-zero rounding. The small
  // tolerance absorbs binary arithmetic noise at exact decimal half-cent ties.
  const rounded = Math.sign(value) * Math.floor(Math.abs(value) * 100 + 0.5 + 1e-8) / 100;
  return `${rounded > 0 ? '+' : ''}${Object.is(rounded,-0) ? '0.00' : rounded.toFixed(2)}%`;
}

function links(ids,sources) {
  if (!list(ids).length) return '<span class="sensitivity-source-empty">无单独发布值；详见本行说明</span>';
  return `<div class="sensitivity-source-links">${[...new Set(list(ids))].map(id => {
    const source = sources.get(id);
    return source ? `<a href="${sourceUrl(source.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.name)} ↗</span><small>${esc(source.date)}</small></a>` : `<span class="sensitivity-source-missing">来源 ${esc(id)} 尚未接入</span>`;
  }).join('')}</div>`;
}

function bullets(items) {
  return `<ul>${list(items).map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function tierClass(tier) {
  return ({'已公布':'published','算术反推':'derived','研究判断':'assumed'})[tier] || 'assumed';
}

function axisRange(values) {
  const valid = list(values).filter(finite);
  return valid.length ? `${format(Math.min(...valid),4)}–${format(Math.max(...valid),4)}` : '未列出';
}

function grid(model) {
  const earnings = list(model.earningsValues), multiples = list(model.multipleValues);
  const reference = model.reference ?? {}, base = model.base ?? {};
  const baseLabel = model.baseLabel || '主假设';
  const rowLabel = model.rowLabel || (model.kind === 'relative' ? '相对盈利（基期 = 100）' : 'EPS 假设');
  const colLabel = model.columnLabel || (model.kind === 'relative' ? '相对估值倍数' : 'P/E 假设');
  const dimensionsOk = earnings.length === 9 && multiples.length === 9;
  const basePresent = earnings.some(value => near(value,base.earnings)) && multiples.some(value => near(value,base.multiple));
  return `<div class="sensitivity-matrix-heading"><div><h4>同一行，固定盈利；向右只改变估值</h4><p>${esc(rowLabel)}：${esc(axisRange(earnings))}；${esc(colLabel)}：${esc(axisRange(multiples))}。全部是研究假设网格，非统计置信区间。</p></div><span class="sensitivity-dimensions">${earnings.length} × ${multiples.length}<small>${earnings.length * multiples.length} 个情景</small></span></div>
    ${dimensionsOk ? '' : '<p class="sensitivity-data-warning">当前轴配置不是完整 9×9；只展示实际提供的组合，不补造假设。</p>'}
    ${basePresent ? '' : '<p class="sensitivity-data-warning">主假设没有同时出现在两条轴上；当前网格没有主假设交点。</p>'}
    <div class="sensitivity-legend"><span><i class="sensitivity-legend-base"></i>${esc(baseLabel)}行／列</span><span><i class="sensitivity-legend-cross"></i>${esc(baseLabel)}交点</span><span>单元格颜色只表示相对基准涨跌，不表示概率或置信度。</span></div>
    <div class="sensitivity-grid-wrap" role="region" aria-label="${esc(model.name)}估值敏感性矩阵，可横向滚动" tabindex="0"><table class="sensitivity-grid"><caption>${esc(model.name)} · 每格为点位与${esc(model.returnLabel || "价格回报（不含分红）")}｜基准 ${esc(exact(reference.level))} 点，${esc(reference.date || '日期待核实')}。悬停或辅助阅读可查看两位小数点位。</caption><thead><tr><th scope="col" class="sensitivity-axis-corner"><span>${esc(rowLabel)} ↓</span><span>${esc(colLabel)} →</span></th>${multiples.map(multiple => `<th scope="col" class="${near(multiple,base.multiple) ? 'is-base-column' : ''}"><strong>${esc(format(multiple,4))}</strong>${near(multiple,base.multiple) ? `<small>${esc(baseLabel)}</small>` : ''}</th>`).join('')}</tr></thead><tbody>${earnings.map(earning => {
      const baseRow = near(earning,base.earnings);
      return `<tr class="${baseRow ? 'is-base-row' : ''}"><th scope="row"><strong>${esc(format(earning,4))}</strong>${baseRow ? `<small>${esc(baseLabel)}</small>` : ''}</th>${multiples.map(multiple => {
        const value = cellValue(model,earning,multiple), ret = priceReturn(value,reference.level);
        const baseColumn = near(multiple,base.multiple), intersection = baseRow && baseColumn;
        const classes = [baseColumn ? 'is-base-column' : '',intersection ? 'is-base-intersection' : '',finite(ret) ? ret < 0 ? 'is-negative' : ret > 0 ? 'is-positive' : 'is-flat' : 'is-missing'].filter(Boolean).join(' ');
        const label = `${model.name ?? ''}；${rowLabel} ${format(earning,4)}；${colLabel} ${format(multiple,4)}；计算点位 ${exact(value)}；相对 ${reference.date || '日期待核实'} 基准的${model.returnLabel || '价格回报'} ${percent(ret)}${intersection ? '；'+baseLabel+'交点' : ''}`;
        return `<td class="${classes}" data-sensitivity-cell data-earnings="${esc(earning)}" data-multiple="${esc(multiple)}" title="${esc(label)}" aria-label="${esc(label)}"><strong>${esc(format(value,0))}</strong><small>${esc(percent(ret))}</small>${intersection ? `<span class="sensitivity-main-mark" aria-hidden="true">${model.baseLabel?'参':'主'}</span>` : ''}</td>`;
      }).join('')}</tr>`;
    }).join('')}</tbody></table></div>`;
}

function readingCards(items,heading) {
  if (!list(items).length) return '';
  return `<section class="sensitivity-reading-section"><h4>${esc(heading)}</h4><div class="sensitivity-readings">${list(items).map(item => `<article><span>${esc(item.label)}</span><strong>${esc(valueText(item.value))}</strong><p>${esc(item.explanation)}</p></article>`).join('')}</div></section>`;
}

function modelView(model,index,sources) {
  const base = model.base ?? {};
  const rowLabel = model.rowLabel || '盈利假设', colLabel = model.columnLabel || '估值假设';
  return `<details class="card sensitivity-model" data-sensitivity-model="${esc(model.id || index)}"${index === 0 ? ' open' : ''}><summary><span class="sensitivity-model-heading"><span class="sensitivity-model-number">0${index+1}</span><span><strong>${esc(model.name)}</strong><small>${model.kind === 'relative' ? '相对盈利 × 相对估值；不是公布的绝对 EPS / P/E' : '盈利单位 × P/E；区分来源、反推与主观假设'}</small></span></span><span class="sensitivity-model-summary">${esc(rowLabel)} ${esc(valueText(base.earnings))} · ${esc(colLabel)} ${esc(valueText(base.multiple))}</span></summary>
    <div class="sensitivity-model-body"><div class="sensitivity-formula"><span>计算口径</span><strong>${esc(model.formula || (model.kind === 'relative' ? '点位 = 基准点位 ×（相对盈利 / 100）× 相对估值倍数' : '点位 = EPS × P/E'))}</strong><p>${esc(model.axisNote || '行固定盈利，列改变估值；仅演示输入变化的算术影响。')}</p></div>
    <h4>这些数字从哪里来</h4><p class="sensitivity-precision-note">公开数据、反推值和研究假设分列。更多小数只代表计算更精细，不代表预测更准确；反推值不是另一个独立数据源。</p>
    <div class="sensitivity-provenance-wrap"><table class="sensitivity-provenance"><thead><tr><th scope="col">来源层级</th><th scope="col">输入与数值</th><th scope="col">为什么能用／有什么限制</th><th scope="col">来源与日期</th></tr></thead><tbody>${list(model.provenance).map(item => `<tr><td><span class="sensitivity-tier ${tierClass(item.tier)}">${esc(item.tier || '研究判断')}</span></td><th scope="row"><span>${esc(item.input)}</span><strong>${esc(valueText(item.value))}</strong></th><td>${esc(item.explanation)}</td><td>${links(item.sourceIds,sources)}</td></tr>`).join('')}</tbody></table></div>
    <section class="sensitivity-number-choice"><h4>为什么选这些数，而不是别的数</h4>${bullets(model.whyNotOtherNumbers)}</section>
    ${grid(model)}
    <div class="sensitivity-elasticity"><span>相同百分比，算术敏感度相同</span><p>固定另一项且其值为正时，盈利 +1% 或估值倍数 +1%，点位都 +1%（弹性均为 1）。两项一起变化要相乘：(1.01 × 1.01 − 1) = 2.01%，不能简单相加。每增加 1 个盈利单位与每增加 1 倍 P/E 的点数影响则不同，须连同单位看。</p></div>
    ${readingCards(model.sensitivity,'单项变化，会改变多少点')}${readingCards(model.breakeven,'守住参考点位，需要什么条件')}
    ${list(model.rangeComparison).length ? `<section class="sensitivity-range-comparison"><h4>${esc(model.rangeComparisonLabel || "怎样与主情景区间对照")}</h4>${bullets(model.rangeComparison)}</section>` : ''}
    <div class="sensitivity-bottom-line"><span>我的解读</span><p>${esc(model.bottomLine)}</p></div></div></details>`;
}

export function sensitivityView(sensitivity,sources = []) {
  if (!sensitivity || !list(sensitivity.models).length) return '';
  const sourceIndex = new Map(list(sources).map(source => [source.id,source]));
  return `<section class="sensitivity-section" aria-label="盈利与估值敏感性研究"><div class="section-heading sensitivity-heading"><div><span class="sensitivity-eyebrow">INPUTS & SENSITIVITY / 数字背后的判断</span><h2>${esc(sensitivity.title || 'EPS × 估值敏感性矩阵')}</h2></div><span>观点日期 ${esc(sensitivity.asOf || '未列出')}</span></div><p class="sensitivity-intro">${esc(sensitivity.intro)}</p><p class="sensitivity-download"><a href="./sensitivity-9x9.txt" download>下载三张完整 9×9 表与假设说明 ↗</a></p>${list(sensitivity.notes).length ? `<div class="sensitivity-notes">${bullets(sensitivity.notes)}</div>` : ''}<div class="sensitivity-models">${list(sensitivity.models).map((model,index) => modelView(model,index,sourceIndex)).join('')}</div></section>`;
}

export function sensitivityReportLines(sensitivity,sources = []) {
  if (!sensitivity || !list(sensitivity.models).length) return [];
  const sourceIndex = new Map(list(sources).map(source => [source.id,source]));
  return [
    '【盈利与估值敏感性 · 完整矩阵】',
    `观点日期：${sensitivity.asOf || '未列出'}`,
    sensitivity.title || 'EPS × 估值敏感性矩阵',sensitivity.intro,
    ...list(sensitivity.notes),
    '所有轴与单元格均为研究假设组合，不是置信区间；无概率权重。回报只与所列日期的参考点位比较，不含分红。',
    '弹性说明：固定另一项且其值为正时，盈利 +1% 与倍数 +1% 都使点位 +1%；两项各 +1% 合计 +2.01%。单位变化的点数影响不同。',
    ...list(sensitivity.models).flatMap(model => {
      const reference = model.reference ?? {}, base = model.base ?? {};
      const rowLabel = model.rowLabel || '盈利假设',colLabel = model.columnLabel || '估值假设';
      const earnings = list(model.earningsValues),multiples = list(model.multipleValues);
      return [
        `【${model.name || '未命名指数'}】${model.kind === 'relative' ? '相对盈利与估值口径，非绝对 EPS / P/E' : '盈利单位 × P/E 口径'}`,
        `公式：${model.formula || (model.kind === 'relative' ? '参考点位 ×（相对盈利 / 100）× 相对估值倍数' : 'EPS × P/E')}`,
        `参考点位：${exact(reference.level)}；参考日期：${reference.date || '待核实'}`,
        ` ${model.baseLabel || "主假设"}：${rowLabel}=${valueText(base.earnings)}；${colLabel}=${valueText(base.multiple)}`,
        `行 ${rowLabel}：${earnings.map(value => format(value,4)).join(' / ')}`,
        `列 ${colLabel}：${multiples.map(value => format(value,4)).join(' / ')}`,
        `维度：${earnings.length}×${multiples.length}，共 ${earnings.length * multiples.length} 格；完整逐格结果如下。`,
        model.axisNote,
        '精度边界：更多小数不代表预测更准确；算术反推不是独立来源。',
        ...list(model.provenance).flatMap(item => [
          `来源分类 ${item.tier || '研究判断'}｜${item.input || ''}=${valueText(item.value)}｜${item.explanation || ''}`,
          ...list(item.sourceIds).map(id => {
            const source = sourceIndex.get(id);
            return source ? `对应来源 ${source.name}｜${source.date}｜${source.url}` : `对应来源 ${id} 尚未接入`;
          })
        ]),
        ...list(model.whyNotOtherNumbers).map(item => `数字选择依据：${item}`),
        ...earnings.flatMap(earning => multiples.map(multiple => {
          const value = cellValue(model,earning,multiple),ret = priceReturn(value,reference.level);
          const isBase = near(earning,base.earnings) && near(multiple,base.multiple);
          return `矩阵格｜${rowLabel}=${format(earning,4)}｜${colLabel}=${format(multiple,4)}｜点位=${exact(value)}｜${model.returnLabel || "价格回报"}=${percent(ret)}${isBase ? '｜'+(model.baseLabel||'主假设')+'交点' : ''}`;
        })),
        ...list(model.sensitivity).map(item => `敏感度 ${item.label || ''}：${valueText(item.value)}；${item.explanation || ''}`),
        ...list(model.breakeven).map(item => `盈亏平衡 ${item.label || ''}：${valueText(item.value)}；${item.explanation || ''}`),
        ...list(model.rangeComparison).map(item => `${model.rangeComparisonLabel || "主情景对照"}：${item}`),
        `解读：${model.bottomLine || ''}`
      ];
    })
  ].filter(value => value !== null && value !== undefined).map(String);
}
