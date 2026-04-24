/**
 * Content for “reference” chart layouts: aligned to ITC supply review demo data
 * (same story as `mockData.js` / original GitHub workshop — not semiconductor wireframe names).
 */
import { planVsActual, underproductionGaps, rmInventoryValueTrend, DEMO_SKUS } from './mockData.js';

const PT = planVsActual;
const N = PT.length;

export const productionWeekLabels = PT.map((r) => r.t);

export const productionAttainmentCombo = PT.map((r) => ({
  w: r.t,
  plan: r.plan,
  produced: r.actual,
  wAdh: Math.round(r.adh * 10) / 10,
  wAtt: 100,
}));

export const productionOverallAdherence = PT.map((r) => Math.round(r.adh * 10) / 10);

const padSeries = (arr) => {
  if (arr.length >= N) return arr.slice(0, N);
  return [...arr, ...Array(N - arr.length).fill(arr[arr.length - 1] ?? 0)];
};

/** Plant × packaging families (SS / SK style — demo %) */
const seriesRaw = [
  [72, 70, 74, 73, 75, 71, 72],
  [98, 100, 99, 102, 98, 100, 99],
  [85, 86, 85, 90, 88, 86, 87],
  [90, 91, 90, 92, 90, 91, 91],
];
export const productionAdherenceBySeries = {
  rows: ['Alutray', 'Can', 'Cup', 'Pouch'],
  values: seriesRaw.map((r) => padSeries(r).map((v) => Math.max(50, Math.min(100, v)))),
};

export const productionTableLatest = [
  { date: PT[PT.length - 1].t, plan: PT[PT.length - 1].plan, produced: PT[PT.length - 1].actual, delta: PT[PT.length - 1].actual - PT[PT.length - 1].plan },
  { date: PT[PT.length - 2].t, plan: PT[PT.length - 2].plan, produced: PT[PT.length - 2].actual, delta: PT[PT.length - 2].actual - PT[PT.length - 2].plan },
  { date: PT[PT.length - 3].t, plan: PT[PT.length - 3].plan, produced: PT[PT.length - 3].actual, delta: PT[PT.length - 3].actual - PT[PT.length - 3].plan },
];

const _over = [420, 310, 180, 120, 95, 72];
const _overPlant = ['SS', 'SS', 'SK', 'SK', 'SS', 'SK'];
const overStory = _over.map((d, i) => ({
  material: `${DEMO_SKUS[i]} (${_overPlant[i]})`,
  delta: d,
}));

export const topOverproductions = overStory;

export const topUnderproductions = underproductionGaps.map((g) => ({
  material: `${g.sku} · ${g.plant}`,
  delta: -g.gap,
}));

/** —— Inventory summary: months from RM trend —— */
export const invSummaryWeeks = rmInventoryValueTrend.map((r) => r.m);

const invM = rmInventoryValueTrend.map((r) => r.value);
export const invValueByLocation = invSummaryWeeks.map((w, i) => ({ w, valueM: invM[i] ?? 120 }));

export const invHealthByMaterial = invSummaryWeeks.map((w, i) => {
  const oos = 12 + (i % 2) * 2;
  const healthy = 4;
  return { w, oos, healthy, aboveStd: 100 - oos - healthy };
});

const k = (i) => Math.round((invM[i] ?? 120) * 1_200 + i * 5_000);

const consolClosing = invM.map((_, i) => k(i));
const consolExcess = invM.map((v, i) => Math.round(v * 1_000 + (i - 1) * 4_200));

/** One row per scope — numbers split ~55% / 45% SS/SK (demo; consol. = sum) */
const ssCloseShare = (c) => Math.round(c * 0.55);
const ssExcessShare = (c) => Math.round(c * 0.58);
export const invClosingByPlant = [
  { id: 'ALL', label: 'ITC — all plants (consol.)', byWeek: consolClosing },
  {
    id: 'SS',
    label: 'SS — Samut Sakhon',
    byWeek: consolClosing.map((c) => ssCloseShare(c)),
  },
  {
    id: 'SK',
    label: 'SK — Songkhla',
    byWeek: consolClosing.map((c, i) => Math.max(0, c - ssCloseShare(c))),
  },
];

export const invExcessByPlant = [
  { id: 'ALL', label: 'ITC — all plants (consol.)', byWeek: consolExcess },
  {
    id: 'SS',
    label: 'SS — Samut Sakhon',
    byWeek: consolExcess.map((c) => ssExcessShare(c)),
  },
  {
    id: 'SK',
    label: 'SK — Songkhla',
    byWeek: consolExcess.map((c) => Math.max(0, c - ssExcessShare(c))),
  },
];

export const invExcessQty = [
  { id: 'Lam-Can · stock SS-RM01', k: 41.2 },
  { id: 'Film-PP · stock SS-FOIL', k: 38.1 },
  { id: 'Crown-Std · SK-CRW', k: 29.4 },
  { id: 'Lid-PS · SS-LID2', k: 22.1 },
  { id: 'Carton-AB · SK-CRT', k: 18.6 },
];

export const invDeficitQty = [
  { id: 'Lam-Can · cons. SK-line', k: 19.6 },
  { id: 'Film-PP · hub SS', k: 14.2 },
  { id: 'Ink-UV · SS-LAB', k: 11.0 },
  { id: 'Crown-Std · SK-imp', k: 8.8 },
  { id: 'Lid-PS · SS-urgent', k: 6.5 },
];

export const expectationsSeed = [
  {
    id: 'E1',
    topic: 'Customer OTIF (portfolio)',
    target: '≥ 93%',
    current: '91.3%',
    rag: 'red',
    owner: 'Logistics & service',
    due: '2026-03-01',
    action: 'Recovery plan — vessel and customer promise alignment',
  },
  {
    id: 'E2',
    topic: 'Plan adherence (week)',
    target: '≥ 95%',
    current: '96.1%',
    rag: 'green',
    owner: 'Plant planning',
    due: '2026-02-28',
    action: 'Monitor Can & Pouch; mitigate overload at SS',
  },
  {
    id: 'E3',
    topic: 'RM availability',
    target: '≥ 98%',
    current: '96.0%',
    rag: 'amber',
    owner: 'RM & procurement',
    due: '2026-02-22',
    action: 'Expedite Lam-Can, Film-PP; confirm backfill window',
  },
  {
    id: 'E4',
    topic: 'Supplier OTIF (roll-up)',
    target: '≥ 90%',
    current: '88.7%',
    rag: 'amber',
    owner: 'Sourcing',
    due: '2026-02-20',
    action: 'QBR with key vendors; open PO at-risk list daily',
  },
];
