/**
 * Demand–supply alignment demo: same SKU / plant / time keys for demand, supply (plan), and join metrics.
 * `category` in seed rows = GitHub link (reusable in upload templates and tables).
 */
import { ITC_DEMO_GITHUB } from '../config/itcDemoLinks.js';
import { planVsActual, DEMO_SKUS } from './mockData.js';

function plannedFromDemand(sku, plant, time, demand) {
  const t = time.length + (plant === 'SK' ? 3 : 0);
  const f = 0.88 + ((DEMO_SKUS.indexOf(sku) + 1) % 4) * 0.03 - (t % 5) * 0.01;
  return Math.max(0, Math.round(demand * Math.min(1.12, f)));
}

export function buildSeedDemandSupply() {
  const times = planVsActual.map((r) => r.t);
  const demandRows = [];
  const supplyRows = [];
  let k = 0;
  for (const t of times) {
    for (const sku of DEMO_SKUS) {
      for (const plant of ['SS', 'SK']) {
        const base = 1_200 + (DEMO_SKUS.indexOf(sku) + 1) * 180;
        const demandQty = base + (times.indexOf(t) % 3) * 120 + (plant === 'SS' ? 0 : 90);
        const demandPriority = 1 + (k % 5);
        k += 1;
        demandRows.push({
          sku,
          plant,
          time: t,
          demandQty,
          demandPriority,
          category: ITC_DEMO_GITHUB,
        });
        supplyRows.push({
          sku,
          plant,
          time: t,
          plannedQty: plannedFromDemand(sku, plant, t, demandQty),
        });
      }
    }
  }
  return { demandRows, supplyRows };
}

const { demandRows: _d, supplyRows: _s } = buildSeedDemandSupply();
export const SEED_DSA_DEMAND = _d;
export const SEED_DSA_SUPPLY = _s;

export function joinKey(sku, plant, time) {
  return `${String(sku).trim().toLowerCase()}|${String(plant).trim().toUpperCase()}|${String(time).trim()}`;
}

/**
 * @param {Array<{ sku: string, plant: string, time: string, demandQty: number, demandPriority: number, category: string }>} demand
 * @param {Array<{ sku: string, plant: string, time: string, plannedQty: number }>} supply
 */
export function joinDemandSupply(demand, supply) {
  const dRows = Array.isArray(demand) ? demand : [];
  const sRows = Array.isArray(supply) ? supply : [];
  const sMap = new Map(sRows.map((r) => [joinKey(r.sku, r.plant, r.time), r]));
  return dRows.map((d) => {
    const s = sMap.get(joinKey(d.sku, d.plant, d.time));
    const planned = s != null ? Number(s.plannedQty) || 0 : 0;
    const dem = Number(d.demandQty) || 0;
    const gap = dem - planned;
    const fulfillablePct = dem > 0 ? Math.min(100, (planned / dem) * 100) : 0;
    const atRisk = Math.max(0, dem - planned);
    return {
      sku: d.sku,
      plant: d.plant,
      time: d.time,
      category: d.category || ITC_DEMO_GITHUB,
      demandQty: dem,
      plannedQty: planned,
      demandPriority: Math.min(5, Math.max(1, Number(d.demandPriority) || 3)),
      gap,
      fulfillablePct: Math.round(fulfillablePct * 10) / 10,
      atRiskQty: Math.round(atRisk),
    };
  });
}

export function filterJoined(rows, f) {
  const plant = f.plant === 'all' ? null : f.plant?.toUpperCase();
  const sku = f.sku === 'all' ? null : f.sku;
  const time = f.time === 'all' ? null : f.time;
  return rows.filter((r) => {
    if (plant && r.plant !== plant) return false;
    if (sku && r.sku !== sku) return false;
    if (time && r.time !== time) return false;
    return true;
  });
}

/** Stacked by time: demand, planned, gap for grouped bar */
export function aggregateByTime(joins) {
  const m = new Map();
  for (const r of joins) {
    const t = r.time;
    if (!m.has(t)) m.set(t, { time: t, demandQty: 0, plannedQty: 0, gap: 0 });
    const x = m.get(t);
    x.demandQty += r.demandQty;
    x.plannedQty += r.plannedQty;
    x.gap += r.gap;
  }
  return [...m.values()];
}

export function kpiFromJoined(joins) {
  const dSum = joins.reduce((a, r) => a + r.demandQty, 0);
  const atRisk = joins.reduce((a, r) => a + r.atRiskQty, 0);
  const fulfill = dSum > 0 ? (joins.reduce((a, r) => a + Math.min(r.plannedQty, r.demandQty), 0) / dSum) * 100 : 0;
  return {
    fulfillablePct: Math.round(fulfill * 10) / 10,
    atRiskQty: atRisk,
  };
}

export function topByGap(joins, n = 8) {
  return [...joins]
    .sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap))
    .slice(0, n)
    .map((r) => ({ ...r, highPriority: r.demandPriority <= 2 }));
}
