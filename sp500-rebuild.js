// Presentation of the archived S&P earnings/valuation study. No fitted parameters.
const esc = x => String(x ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arr = x => Array.isArray(x) ? x : [];
const sourceLinks = (ids,sources) => arr(ids).map(id=>arr(sources).find(s=>s.id===id)).filter(Boolean).map(s=>`<a href="${/^https?:\/\//.test(s.url)?esc(s.url):'#'}" target="_blank" rel="noopener noreferrer">${esc(s.name)} ↗<small>${esc(s.date)}</small></a>`).join('');

export function sp500RebuildView(study,sources) {
  if (!study) return '';
  return `<section class="sp-rebuild card" id="sp500-rebuild" aria-label="标普盈利与估值重建">
    <div class="sp-rebuild-header"><div><span class="targets-eyebrow">S&P 500 / 从证据重建</span><h2>${esc(study.title)}</h2></div><span class="sp-rebuild-version">${esc(study.date)}<br>${esc(study.targetDate)}</span></div>
    <p class="sp-rebuild-lead">${esc(study.conclusion)}</p>
    <div class="sp-rebuild-stats">${arr(study.stats).map(s=>`<article><span>${esc(s.label)}</span><strong>${esc(s.value)}</strong><p>${esc(s.note)}</p></article>`).join('')}</div>
    <div class="sp-rebuild-change"><strong>这次改变了什么</strong><p>${esc(study.change)}</p></div>
    ${arr(study.sections).map((s,i)=>`<details class="sp-rebuild-section"${s.open?' open':''}><summary><span>${String(i+1).padStart(2,'0')}</span>${esc(s.title)}</summary><div class="sp-rebuild-section-body"><p>${esc(s.intro)}</p>${s.formula?`<div class="sp-rebuild-formula">${esc(s.formula)}</div>`:''}${arr(s.rows).length?`<div class="sp-rebuild-table"><table><caption>${esc(s.caption||s.title)}</caption><thead><tr>${arr(s.headers).map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(row=>`<tr>${row.map((c,j)=>j===0?`<th scope="row">${esc(c)}</th>`:`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}${arr(s.notes).length?`<ul>${s.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul>`:''}<div class="sp-rebuild-sources">${sourceLinks(s.sourceIds,sources)}</div></div></details>`).join('')}
    <p class="sp-rebuild-footer">${esc(study.limit)}</p><a class="sp-rebuild-download" href="./sp500-eps-pe.txt" download>下载标普盈利与估值完整说明 ↗</a>
  </section>`;
}

export function sp500RebuildReportLines(study,sources) {
  if(!study) return [];
  return ['【标普盈利与估值重建】',study.title,study.date,study.targetDate,study.conclusion,...arr(study.stats).map(s=>`${s.label}：${s.value}。${s.note}`),'本次变更：'+study.change,...arr(study.sections).flatMap(s=>['【'+s.title+'】',s.intro,s.formula||'',arr(s.headers).join(' | '),...arr(s.rows).map(row=>row.join(' | ')),...arr(s.notes),...arr(s.sourceIds).map(id=>arr(sources).find(x=>x.id===id)).filter(Boolean).map(x=>`${x.name}｜${x.date}｜${x.url}`)]),study.limit].filter(Boolean);
}
