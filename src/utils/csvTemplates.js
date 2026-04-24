/**
 * ITC Supply Review — CSV template definitions. Downloaded files are prefilled with the same
 * dummy rows as `itcTemplateRows.js` (aligned to mock / UI tables; replace for production).
 */
import {
  buildTemplateCsvString,
  rowsPlanVsActualWeek,
  rowsAdherenceByPackaging,
  rowsCapacityUtilization,
  rowsRmValueIndex,
  rowsRmHealthPct,
  rowsExcessDeficit,
  rowsSupplierOtif,
  rowsOpenPo,
  rowsCustomerOtif,
  rowsOtifRcaPlant,
  rowsExpectations,
  rowsSopActions,
  rowsIssueTreeReasons,
  rowsDsaDemand,
  rowsDsaSupplyPlan,
} from './itcTemplateRows.js';

function download(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * @typedef {{ id: string, name: string, filename: string, headers: string[], getRows: () => string[][] }} CsvItem
 */

/** @type {{ tab: string, items: CsvItem[] }[]} */
export const ITC_METRIC_TEMPLATE_GROUPS = [
  {
    tab: 'Demand Supply Alignment',
    items: [
      {
        id: 'dsa_demand',
        name: 'Demand (SKU, plant, time) — with priority & category link',
        filename: 'itc_template_dsa_demand.csv',
        headers: ['sku', 'plant', 'time', 'demand_qty', 'demand_priority', 'category'],
        getRows: rowsDsaDemand,
      },
      {
        id: 'dsa_supply',
        name: 'Supply / production plan (Planned Qty) — same keys for join',
        filename: 'itc_template_dsa_supply_plan.csv',
        headers: ['sku', 'plant', 'time', 'planned_qty'],
        getRows: rowsDsaSupplyPlan,
      },
    ],
  },
  {
    tab: 'Production & capacity',
    items: [
      {
        id: 'prod_plan_actual_week',
        name: 'Plan vs actual (weekly) — adherence / attainment chart',
        filename: 'itc_template_production_plan_vs_actual_week.csv',
        headers: ['week_id', 'plant_code', 'planned_qty', 'produced_qty', 'adherence_pct', 'attainment_pct'],
        getRows: rowsPlanVsActualWeek,
      },
      {
        id: 'prod_pack_heatmap',
        name: 'Adherence by packaging (plant × line × week)',
        filename: 'itc_template_production_adherence_by_packaging.csv',
        headers: ['week_id', 'plant_code', 'packaging', 'adherence_pct'],
        getRows: rowsAdherenceByPackaging,
      },
      {
        id: 'capacity_utilization',
        name: 'Capacity utilization (plant × packaging × month)',
        filename: 'itc_template_capacity_utilization.csv',
        headers: ['plant_code', 'packaging_type', 'month', 'effective_capacity', 'actual_volume', 'utilization_pct'],
        getRows: rowsCapacityUtilization,
      },
    ],
  },
  {
    tab: 'Raw materials inventory',
    items: [
      {
        id: 'rm_value_trend',
        name: 'RM inventory value index (monthly)',
        filename: 'itc_template_rm_inventory_value_index.csv',
        headers: ['month', 'plant_code', 'value_index', 'policy_target_index'],
        getRows: rowsRmValueIndex,
      },
      {
        id: 'rm_health',
        name: 'Inventory health % (OOS / healthy / above std)',
        filename: 'itc_template_rm_health_pct.csv',
        headers: ['month', 'oos_pct', 'healthy_pct', 'above_std_pct'],
        getRows: rowsRmHealthPct,
      },
      {
        id: 'excess_deficit',
        name: 'Prioritized excess & deficit (material · sloc / plant)',
        filename: 'itc_template_inventory_excess_deficit.csv',
        headers: ['material_key', 'plant_code', 'excess_qty', 'deficit_qty', 'uom'],
        getRows: rowsExcessDeficit,
      },
    ],
  },
  {
    tab: 'Supplier',
    items: [
      {
        id: 'supplier_otif',
        name: 'Supplier OTIF & in-full (by supplier / month)',
        filename: 'itc_template_supplier_otif.csv',
        headers: ['supplier_id', 'material_family', 'plant_code', 'month', 'otif_pct', 'in_full_pct'],
        getRows: rowsSupplierOtif,
      },
      {
        id: 'open_po',
        name: 'Open purchase orders (risk stack by month)',
        filename: 'itc_template_open_po_risk.csv',
        headers: ['month', 'on_track', 'at_risk', 'past_due'],
        getRows: rowsOpenPo,
      },
    ],
  },
  {
    tab: 'OTIF & customer delivery',
    items: [
      {
        id: 'customer_otif',
        name: 'Customer OTIF (monthly trend + schedule proxies)',
        filename: 'itc_template_customer_otif.csv',
        headers: ['month', 'otif_pct', 'on_time_pct', 'in_full_pct'],
        getRows: rowsCustomerOtif,
      },
      {
        id: 'otif_rca',
        name: 'OTIF RCA by plant (driver families, % of misses)',
        filename: 'itc_template_otif_rca_plant.csv',
        headers: ['plant', 'vessel', 'customer', 'material', 'prod_qa', 'wh', 'external'],
        getRows: rowsOtifRcaPlant,
      },
    ],
  },
  {
    tab: 'Expectations, actions & issue tree',
    items: [
      {
        id: 'expectations',
        name: 'Expectations & actions (by expectation_id)',
        filename: 'itc_template_expectations_actions.csv',
        headers: ['expectation_id', 'topic', 'target', 'current', 'rag', 'owner', 'due', 'action'],
        getRows: rowsExpectations,
      },
      {
        id: 'actions_sop',
        name: 'S&OP / forum actions (upsert by action_id)',
        filename: 'itc_template_sop_actions.csv',
        headers: ['action_id', 'issue', 'owner', 'due', 'status', 'severity', 'forum'],
        getRows: rowsSopActions,
      },
      {
        id: 'issue_tree_reasons',
        name: 'OTIF client reason codes & RCA mapping',
        filename: 'itc_template_issue_tree_reasons.csv',
        headers: [
          'client_code',
          'client_reason_text',
          'parent_code',
          'level',
          'path_id',
          'executive_family',
          'weight_pct',
          'maps_to_root_label',
        ],
        getRows: rowsIssueTreeReasons,
      },
    ],
  },
];

export function downloadMetricTemplate(item) {
  if (!item.getRows) throw new Error('Template must define getRows()');
  const content = buildTemplateCsvString(item.headers, item.getRows());
  download(item.filename, content);
}

export function downloadAllItcTemplates() {
  ITC_METRIC_TEMPLATE_GROUPS.forEach((g) => {
    g.items.forEach((item) => downloadMetricTemplate(item));
  });
}

export const METRIC_TEMPLATE_GROUPS = ITC_METRIC_TEMPLATE_GROUPS;
export const downloadAllTemplatesZip = downloadAllItcTemplates;
