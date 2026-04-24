import { useState } from 'react';
import { PlantUtilizationGrids } from '../components/PlantUtilizationGrids.jsx';
import { PlanActualComboChart } from '../components/charts/PlanActualComboChart.jsx';
import { Adherence100StackedChart } from '../components/charts/Adherence100StackedChart.jsx';
import { UnderproductionRankChart } from '../components/charts/UnderproductionRankChart.jsx';
import { BottleneckScatterChart } from '../components/charts/BottleneckScatterChart.jsx';
import { ProductionAttainmentTemplate } from '../components/templates/ProductionAttainmentTemplate.jsx';
import {
  planVsActual,
  adherence100Stacked,
  underproductionGaps,
  bottleneckLoadVsCap,
  bottleneckLoadVsCapSk,
} from '../data/mockData.js';

export function ProductionCapacity() {
  const [showItc, setShowItc] = useState(false);

  return (
    <div>
      <ProductionAttainmentTemplate />

      <div className="ref-more-toggle">
        <button type="button" className="gfb-btn secondary" onClick={() => setShowItc((x) => !x)}>
          {showItc ? 'Hide' : 'Show'} ITC / Gold supplementary charts (utilization, bottleneck, …)
        </button>
      </div>
      {showItc ? (
        <div className="grid-12" style={{ marginTop: '0.5rem' }}>
          <div className="span-12">
            <div className="arch-band-title">
              <span>ITC / Gold — supplementary</span>
              <p className="arch-band-sub">Same mock series as before; for plant × packaging and bottleneck drill</p>
            </div>
          </div>
          <div className="span-12">
            <PlanActualComboChart
              title="Plan vs actual (bar + line)"
              subtitle="Time × output — weekly"
              data={planVsActual}
            />
          </div>
          <div className="span-12">
            <Adherence100StackedChart
              title="Adherence bucket — 100% stacked (stability)"
              subtitle="Share of work on / over / under plan"
              data={adherence100Stacked}
            />
          </div>
          <div className="span-6">
            <UnderproductionRankChart
              title="Underproduction — SKU bar ranking (gap)"
              data={underproductionGaps}
            />
          </div>
          <div className="span-6">
            <BottleneckScatterChart
              data={bottleneckLoadVsCap}
              title="Bottleneck utilization (SS)"
            />
          </div>
          <div className="span-12">
            <BottleneckScatterChart data={bottleneckLoadVsCapSk} title="Bottleneck utilization (SK)" />
          </div>
          <div className="span-12">
            <PlantUtilizationGrids subtitle="Capacity heatmap — plant × packaging" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
