/**
 * Prefilled example rows for CSV downloads — aligned to `mockData.js` and `referenceTemplateData.js`
 * (same values users see in charts / tables; replace with production feeds).
 */
import { planVsActual, heatmapRca, otifTrend, openPoStacked, supplierOtif, actionRows, rmInventoryValueTrend } from '../data/mockData.js';
import { productionAdherenceBySeries, invExcessQty, invDeficitQty, expectationsSeed, invHealthByMaterial } from '../data/referenceTemplateData.js';
import { SEED_DSA_DEMAND, SEED_DSA_SUPPLY } from '../data/demandSupplyData.js';

const mToIso = {
  Oct: '2025-10',
  Nov: '2025-11',
  Dec: '2025-12',
  Jan: '2026-01',
  Feb: '2026-02',
  Sep: '2025-09',
};

const Y = (v) => String(v);

const BOM = '\uFEFF';

function escCell(c) {
  const s0 = String(c);
  if (/[",\n]/.test(s0)) return `"${s0.replace(/"/g, '""')}"`;
  return s0;
}

export function buildTemplateCsvString(headers, dataRows) {
  const lines = [headers.map(escCell).join(',')];
  for (const r of dataRows) lines.push(r.map(escCell).join(','));
  return `${BOM}${lines.join('\n')}\n`;
}

function plantFromLabel(id) {
  if (id.includes('SK-') && !id.includes('SS-')) return 'SK';
  if (id.includes('· cons. SK') || id.includes('SK-line')) return 'SK';
  return 'SS';
}

export function rowsPlanVsActualWeek() {
  const a = planVsActual.map((r) => [r.t, 'SS', Y(r.plan), Y(r.actual), String(Math.round(r.adh * 10) / 10), '100']);
  a.push(['Oct W1', 'SK', '10000', '10050', '100.5', '100'], ['Nov W1', 'SK', '9900', '9850', '99.5', '100']);
  return a;
}

export function rowsAdherenceByPackaging() {
  const w0 = planVsActual[0].t;
  const w1 = planVsActual[1]?.t ?? w0;
  return productionAdherenceBySeries.rows.flatMap((rowName, ri) => [
    [w0, 'SS', rowName, String(productionAdherenceBySeries.values[ri][0])],
    [w1, 'SK', rowName, String(productionAdherenceBySeries.values[ri][1] ?? 90)],
  ]);
}

export function rowsCapacityUtilization() {
  return [
    ['SS', 'Can', '2026-02', '5000', '5250', '105'],
    ['SS', 'Pouch', '2026-02', '3000', '2800', '93'],
    ['SK', 'Can', '2026-02', '4800', '4220', '88'],
    ['SK', 'Sachet', '2026-02', '2000', '1980', '99'],
  ];
}

export function rowsRmValueIndex() {
  return rmInventoryValueTrend.map((r) => [mToIso[r.m] || r.m, 'ALL', Y(r.value), Y(r.target)]);
}

export function rowsRmHealthPct() {
  return invHealthByMaterial.map((h) => {
    const iso = mToIso[h.w] || h.w;
    return [iso, Y(h.oos), Y(h.healthy), Y(h.aboveStd)];
  });
}

export function rowsExcessDeficit() {
  const a = invExcessQty.map((e) => [e.id, plantFromLabel(e.id), Y(Math.round(e.k * 1000)), '0', 'kg']);
  const b = invDeficitQty.map((e) => [e.id, plantFromLabel(e.id), '0', Y(Math.round(e.k * 1000)), 'kg']);
  return [...a, ...b];
}

export function rowsSupplierOtif() {
  return supplierOtif.map((s) => {
    const plant = s.v >= 90 ? 'SS' : 'SK';
    return [s.name, 'Meat & RM', plant, '2026-02', Y(s.v), Y(Math.min(99, s.v + 3))];
  });
}

export function rowsOpenPo() {
  return openPoStacked.map((p) => {
    const iso = mToIso[p.m] || p.m;
    return [iso, Y(p.onTrack), Y(p.atRisk), Y(p.pastDue)];
  });
}

export function rowsCustomerOtif() {
  return otifTrend.map((o) => [mToIso[o.m] || o.m, Y(o.otif), Y(Math.min(95, o.otif + 2.5)), Y(94.5)]);
}

export function rowsOtifRcaPlant() {
  return heatmapRca.map((h) => [h.plant, Y(h.vessel), Y(h.customer), Y(h.material), Y(h.production), Y(h.wh), Y(h.external)]);
}

export function rowsExpectations() {
  return expectationsSeed.map((e) => [e.id, e.topic, e.target, e.current, e.rag, e.owner, e.due, e.action]);
}

export function rowsSopActions() {
  return actionRows.map((a, i) => [`ACT-${String(i + 1).padStart(3, '0')}`, a.issue, a.owner, a.due, a.status, a.severity, a.forum]);
}

export function rowsIssueTreeReasons() {
  return [
    ['VSL-14', 'Vessel rolled / slot lost', 'ROOT', '1', 'path-1', 'vessel_export', '12', 'Order delivery'],
    ['CUST-22', 'Customer order change < lead time', 'VSL-14', '2', 'path-1-2', 'customer_order', '8', 'Demand'],
    ['MAT-09', 'RM late vs PO promise', 'ROOT', '1', 'path-2', 'material', '15', 'Material'],
  ];
}

/** First example rows: join key = sku + plant + time (same as Demand supply alignment tab) */
export function rowsDsaDemand() {
  return SEED_DSA_DEMAND.slice(0, 14).map((r) => [r.sku, r.plant, r.time, Y(r.demandQty), Y(r.demandPriority), r.category]);
}

export function rowsDsaSupplyPlan() {
  return SEED_DSA_SUPPLY.slice(0, 14).map((r) => [r.sku, r.plant, r.time, Y(r.plannedQty)]);
}
