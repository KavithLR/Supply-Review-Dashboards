/** Mock datasets for demo / workshop mode — safe sample values */

export const kpiRibbon = [
  {
    id: 'fca',
    label: 'Forecast Accuracy',
    value: '94.2',
    unit: '%',
    target: '92%',
    variance: '+2.2 pts',
    rag: 'green',
    spark: [88, 90, 91, 89, 92, 93, 94.2],
  },
  {
    id: 'bias',
    label: 'Forecast Bias',
    value: '+1.8',
    unit: '%',
    target: '±2%',
    variance: 'within band',
    rag: 'amber',
    spark: [3, 2.5, 2, 1.5, 2.2, 2, 1.8],
  },
  {
    id: 'svb',
    label: 'Sales vs Budget',
    value: '102.4',
    unit: '%',
    target: '100%',
    variance: '+2.4%',
    rag: 'green',
    spark: [98, 99, 100, 101, 101.5, 102, 102.4],
  },
  {
    id: 'ppa',
    label: 'Plan Adherence',
    value: '96.1',
    unit: '%',
    target: '95%',
    variance: '+1.1 pts',
    rag: 'green',
    spark: [93, 94, 94.5, 95, 95.2, 95.8, 96.1],
  },
  {
    id: 'cotif',
    label: 'Customer OTIF',
    value: '91.3',
    unit: '%',
    target: '93%',
    variance: '-1.7 pts',
    rag: 'red',
    spark: [94, 93.5, 93, 92.5, 92, 91.5, 91.3],
  },
  {
    id: 'sotif',
    label: 'Supplier OTIF',
    value: '88.7',
    unit: '%',
    target: '90%',
    variance: '-1.3 pts',
    rag: 'amber',
    spark: [90, 89.8, 89.5, 89.2, 89, 88.8, 88.7],
  },
  {
    id: 'dio',
    label: 'RM DIO',
    value: '42',
    unit: 'days',
    target: '45',
    variance: '-3 days',
    rag: 'green',
    spark: [48, 47, 46, 45, 44, 43, 42],
  },
  {
    id: 'logcost',
    label: 'Logistics Cost % Sales',
    value: '4.6',
    unit: '%',
    target: '4.5%',
    variance: '+0.1 pts',
    rag: 'amber',
    spark: [4.2, 4.25, 4.3, 4.35, 4.4, 4.45, 4.6],
  },
];

export const waterfallBridge = [
  { name: 'Budget', value: 100, type: 'start' },
  { name: 'Base demand', value: 3, type: 'positive' },
  { name: 'Confirmed upside', value: 2.5, type: 'positive' },
  { name: 'Pipeline', value: 1.2, type: 'positive' },
  { name: 'Risk / downside', value: -4.3, type: 'negative' },
  { name: 'Net outlook', value: 102.4, type: 'total' },
];

export const momTrendStrip = [
  { month: 'Oct', demand: 98, production: 95, service: 93, inventory: 102 },
  { month: 'Nov', demand: 99, production: 96, service: 92, inventory: 101 },
  { month: 'Dec', demand: 100, production: 96, service: 91, inventory: 100 },
  { month: 'Jan', demand: 101, production: 97, service: 91.5, inventory: 99 },
  { month: 'Feb', demand: 102, production: 96, service: 91.3, inventory: 98 },
];

/** Production — plan vs actual (ITC arch: bar + line, time × qty + %) */
export const planVsActual = [
  { t: 'Oct W1', plan: 9_800, actual: 9_550, adh: 97.4 },
  { t: 'Oct W2', plan: 9_900, actual: 9_700, adh: 98.0 },
  { t: 'Nov W1', plan: 10_000, actual: 9_820, adh: 98.2 },
  { t: 'Nov W2', plan: 10_000, actual: 9_720, adh: 97.2 },
  { t: 'Dec W1', plan: 10_200, actual: 9_880, adh: 96.9 },
  { t: 'Jan W1', plan: 10_300, actual: 9_900, adh: 96.1 },
  { t: 'Feb W1', plan: 10_200, actual: 9_680, adh: 95.0 },
];

/** Adherence bucket — 100% stacked (on-plan vs over/under) */
export const adherence100Stacked = [
  { m: 'Oct', onPlan: 38, overPlan: 10, underPlan: 6, notRun: 46 },
  { m: 'Nov', onPlan: 40, overPlan: 8, underPlan: 5, notRun: 47 },
  { m: 'Dec', onPlan: 42, overPlan: 9, underPlan: 5, notRun: 44 },
  { m: 'Jan', onPlan: 41, overPlan: 11, underPlan: 6, notRun: 42 },
  { m: 'Feb', onPlan: 40, overPlan: 10, underPlan: 4, notRun: 46 },
];

/** One canonical demo SKU set — use everywhere a chart or template references product codes */
export const DEMO_SKUS = ['FG-Can-A1', 'FG-Cup-22', 'FG-Pch-M9', 'FG-Sct-P4', 'FG-Alt-01', 'FG-Twn-88'];

/**
 * Underproduction by SKU (gap = planned − actual, metric tons)
 * Same `sku` values as demand–supply alignment and upload templates
 */
const _gapDemo = [420, 310, 280, 120, 95, 75];
const _plant = ['SS', 'SS', 'SK', 'SK', 'SS', 'SK'];
export const underproductionGaps = DEMO_SKUS.map((sku, i) => ({
  sku,
  gap: _gapDemo[i] ?? 80,
  plant: _plant[i] ?? 'SS',
}));

/**
 * Bottleneck scatter — line load / effective cap (Y) vs line (X).
 * Tied to same demo story: Can at SS >100% utilization.
 */
export const bottleneckLoadVsCap = [
  { line: 'Alutray', load: 70, cap: 80, u: 87 },
  { line: 'Can', load: 105, cap: 100, u: 105 },
  { line: 'Cup', load: 82, cap: 96, u: 85 },
  { line: 'Pouch', load: 88, cap: 99, u: 91 },
  { line: 'Sachet', load: 74, cap: 80, u: 78 },
];

export const bottleneckLoadVsCapSk = [
  { line: 'Can', load: 80, cap: 91, u: 88 },
  { line: 'Cup', load: 89, cap: 97, u: 92 },
  { line: 'Pouch', load: 76, cap: 96, u: 79 },
  { line: 'Sachet', load: 90, cap: 96, u: 94 },
  { line: 'Spout', load: 79, cap: 98, u: 81 },
  { line: 'Twin p.', load: 70, cap: 92, u: 76 },
];

export const exceptionsSummary = [
  { title: 'OTIF below target — 3 plants', severity: 'red', impact: 'High' },
  { title: 'Can line >100% utilization (SS)', severity: 'amber', impact: 'Med' },
  { title: '12 actions overdue', severity: 'red', impact: 'Med' },
];

export const heatmapRca = [
  { plant: 'SS', vessel: 32, customer: 18, material: 12, production: 22, wh: 10, external: 6 },
  { plant: 'SK', vessel: 28, customer: 22, material: 15, production: 18, wh: 12, external: 5 },
];

export const fcaTrend = [
  { period: 'Aug', total: 91, npd: 84 },
  { period: 'Sep', total: 92, npd: 85 },
  { period: 'Oct', total: 93, npd: 87 },
  { period: 'Nov', total: 93.5, npd: 88 },
  { period: 'Dec', total: 94, npd: 89 },
  { period: 'Jan', total: 94.2, npd: 90 },
];

export const biasByCustomer = [
  { name: 'Customer A', bias: 4.2 },
  { name: 'Customer B', bias: -3.1 },
  { name: 'Customer C', bias: 2.8 },
  { name: 'Customer D', bias: -5.4 },
  { name: 'Customer E', bias: 1.1 },
];

export const productionAdherence = [
  { month: 'Oct', SS: 94, SK: 96 },
  { month: 'Nov', SS: 95, SK: 95 },
  { month: 'Dec', SS: 96, SK: 97 },
  { month: 'Jan', SS: 95, SK: 96 },
  { month: 'Feb', SS: 96.5, SK: 95.8 },
];

export const adherenceBuckets = [
  { name: 'Within ±10%', SS: 78, over: 12, under: 8, none: 2 },
  { name: 'SK', SS: 0, over: 15, under: 10, none: 3 },
];

export const otifTrend = [
  { m: 'Sep', otif: 93.2 },
  { m: 'Oct', otif: 92.8 },
  { m: 'Nov', otif: 92.1 },
  { m: 'Dec', otif: 91.8 },
  { m: 'Jan', otif: 91.5 },
  { m: 'Feb', otif: 91.3 },
];

export const rcaPareto = [
  { family: 'Vessel / export', misses: 42, pct: 42 },
  { family: 'Customer / order', misses: 28, pct: 70 },
  { family: 'Material', misses: 15, pct: 85 },
  { family: 'Production / quality', misses: 10, pct: 95 },
  { family: 'WH / loading', misses: 4, pct: 99 },
  { family: 'External', misses: 1, pct: 100 },
];

export const vesselMisses = [
  { month: 'Oct', pct: 4.2 },
  { month: 'Nov', pct: 5.1 },
  { month: 'Dec', pct: 5.8 },
  { month: 'Jan', pct: 6.0 },
  { month: 'Feb', pct: 6.4 },
];

export const logisticsCost = [
  { m: 'Oct', freight: 2.1, wh: 1.2, premium: 0.8, other: 0.4 },
  { m: 'Nov', freight: 2.2, wh: 1.15, premium: 0.85, other: 0.42 },
  { m: 'Dec', freight: 2.25, wh: 1.2, premium: 0.9, other: 0.45 },
  { m: 'Jan', freight: 2.3, wh: 1.22, premium: 0.92, other: 0.46 },
  { m: 'Feb', freight: 2.35, wh: 1.25, premium: 0.95, other: 0.5 },
];

export const supplierOtif = [
  { name: 'Supplier North', v: 91 },
  { name: 'Supplier East', v: 88 },
  { name: 'Supplier West', v: 86 },
  { name: 'Supplier South', v: 90 },
];

export const rmDioTrend = [
  { m: 'Sep', dio: 46 },
  { m: 'Oct', dio: 45 },
  { m: 'Nov', dio: 44 },
  { m: 'Dec', dio: 43 },
  { m: 'Jan', dio: 42.5 },
  { m: 'Feb', dio: 42 },
];

/** RM inventory value trend (core stock movement view) */
export const rmInventoryValueTrend = [
  { m: 'Oct', value: 118, target: 115 },
  { m: 'Nov', value: 119, target: 116 },
  { m: 'Dec', value: 120, target: 116 },
  { m: 'Jan', value: 122, target: 117 },
  { m: 'Feb', value: 121, target: 118 },
];

/** Health split — % of portfolio (healthy, buffer, at-risk, excess) */
export const rmHealthSplit = [
  { m: 'Oct', healthy: 64, buffer: 18, atRisk: 12, excess: 6 },
  { m: 'Nov', healthy: 65, buffer: 17, atRisk: 11, excess: 7 },
  { m: 'Dec', healthy: 64, buffer: 18, atRisk: 12, excess: 6 },
  { m: 'Jan', healthy: 63, buffer: 17, atRisk: 13, excess: 7 },
  { m: 'Feb', healthy: 62, buffer: 18, atRisk: 13, excess: 7 },
];

/** Exception dual — shortage vs excess qty by material (relative units) */
export const rmExceptionDual = [
  { material: 'Lam-Can', short: 42, ex: 0 },
  { material: 'Film-PP', short: 28, ex: 0 },
  { material: 'Ink-UV', short: 0, ex: 3 },
  { material: 'Crown-Std', short: 15, ex: 0 },
  { material: 'Carton-AB', short: 0, ex: 12 },
];

export const materialGapByPlant = {
  rows: ['Lam-Can', 'Film-PP', 'Ink-UV', 'Crown-Std', 'Lid-PS'],
  cols: ['SS', 'SK'],
  /** + = excess, − = shortage (days cover gap vs target) */
  values: [
    [-1.2, 0.4],
    [0.8, -0.5],
    [0.0, 0.2],
    [-0.3, 0.1],
    [0.5, -0.2],
  ],
};

/** Supplier OTIF trend (same 88.7% terminal as KPI) */
export const supplierOtifTrend = [
  { m: 'Oct', vendorA: 91, vendorB: 90, all: 90.0 },
  { m: 'Nov', vendorA: 90, vendorB: 89, all: 89.2 },
  { m: 'Dec', vendorA: 89, vendorB: 88, all: 88.5 },
  { m: 'Jan', vendorA: 89, vendorB: 87, all: 88.0 },
  { m: 'Feb', vendorA: 88, vendorB: 87, all: 88.7 },
];

export const supplierLeadTime = [
  { name: 'North', days: 18, signal: 2.4 },
  { name: 'East', days: 16, signal: 2.0 },
  { name: 'West', days: 20, signal: 2.8 },
  { name: 'South', days: 17, signal: 1.2 },
  { name: 'Imp-Asia', days: 22, signal: 1.0 },
];

/** Open purchase orders at risk (stack) */
export const openPoStacked = [
  { m: 'Oct', onTrack: 32, atRisk: 5, pastDue: 1 },
  { m: 'Nov', onTrack: 34, atRisk: 6, pastDue: 2 },
  { m: 'Dec', onTrack: 30, atRisk: 7, pastDue: 1 },
  { m: 'Jan', onTrack: 31, atRisk: 8, pastDue: 2 },
  { m: 'Feb', onTrack: 30, atRisk: 6, pastDue: 1 },
];

export const slobAging = [
  { bucket: '0-30d', val: 62 },
  { bucket: '31-60d', val: 18 },
  { bucket: '61-90d', val: 12 },
  { bucket: '90+d', val: 8 },
];

export const actionRows = [
  {
    id: 1,
    issue: 'Export lane congestion — EU west',
    owner: 'Logistics',
    due: '2026-03-01',
    status: 'Open',
    severity: 'High',
    forum: 'Pre-S&OP',
  },
  {
    id: 2,
    issue: 'Bias spike — Customer D',
    owner: 'Demand Planning',
    due: '2026-02-28',
    status: 'In progress',
    severity: 'Med',
    forum: 'Demand Review',
  },
  {
    id: 3,
    issue: 'Can line over-capacity SS',
    owner: 'Plant Planning',
    due: '2026-02-15',
    status: 'Overdue',
    severity: 'High',
    forum: 'Supply Review',
  },
];

export const uploadAudit = [
  { time: '2026-02-20 06:00', user: 'PMO', action: 'Full refresh' },
  { time: '2026-02-19 18:12', user: 'Analyst', action: 'Demand sheet mapped' },
];
