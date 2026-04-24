import { useEffect, useMemo, useState } from 'react';
import { packagingFilterOptions } from './data/plantHierarchy.js';
import { GlobalFilterBar } from './components/GlobalFilterBar.jsx';
import { ProductionCapacity } from './pages/ProductionCapacity.jsx';
import { InventoryRm } from './pages/InventoryRm.jsx';
import { SupplierPerformance } from './pages/SupplierPerformance.jsx';
import { OtifDashboard } from './pages/OtifDashboard.jsx';
import { ExpectationsActionsPage } from './pages/ExpectationsActionsPage.jsx';
import { DataUploadPage } from './pages/DataUploadPage.jsx';
import { DemandSupplyAlignment } from './pages/DemandSupplyAlignment.jsx';
import { ItcBrandMark } from './components/ItcBrandMark.jsx';

const TABS = [
  { id: 'demandSupply', label: 'Demand Supply Alignment' },
  { id: 'production', label: 'Production & capacity' },
  { id: 'inventory', label: 'Raw materials inventory' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'otif', label: 'OTIF' },
  { id: 'expectations', label: 'Expectations & actions' },
  { id: 'data', label: 'Data upload' },
];

export default function App() {
  const [tab, setTab] = useState('demandSupply');
  const [period, setPeriod] = useState('YTD');
  const [plant, setPlant] = useState('all');
  const [packaging, setPackaging] = useState('all');
  const [theme, setTheme] = useState(() => localStorage.getItem('sop-theme') || 'light');
  const [demo, setDemo] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sop-theme', theme);
  }, [theme]);

  const packagingOptions = useMemo(() => packagingFilterOptions(plant), [plant]);

  useEffect(() => {
    if (packaging === 'all') return;
    const ok = packagingOptions.some((o) => o.value === packaging);
    if (!ok) setPackaging('all');
  }, [plant, packaging, packagingOptions]);

  const breadcrumb = useMemo(() => {
    const parts = [period, plant !== 'all' ? plant.toUpperCase() : 'All plants', packaging !== 'all' ? packaging : 'All packaging'];
    return `Active: ${parts.join(' · ')}`;
  }, [period, plant, packaging]);

  const lastRefresh = '2026-02-20 06:00 ICT';

  const content = (() => {
    switch (tab) {
      case 'production':
        return <ProductionCapacity />;
      case 'inventory':
        return <InventoryRm />;
      case 'demandSupply':
        return <DemandSupplyAlignment />;
      case 'supplier':
        return <SupplierPerformance />;
      case 'otif':
        return <OtifDashboard />;
      case 'expectations':
        return <ExpectationsActionsPage />;
      case 'data':
        return <DataUploadPage theme={theme} onThemeToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} demo={demo} onDemo={setDemo} />;
      default:
        return null;
    }
  })();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header-top">
          <div className="app-brand">
            <ItcBrandMark />
            <div>
              <h1>ITC Supply Review Dashboard</h1>
              <span className="app-tagline">Production, raw materials inventory, suppliers, and OTIF — supply review</span>
            </div>
          </div>
          {demo ? (
            <span className="demo-badge" title="Mock data for workshops">
              Demo mode
            </span>
          ) : null}
        </div>
        <nav className="app-tabs" aria-label="Primary">
          {TABS.map((t) => (
            <button key={t.id} type="button" className={`app-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <GlobalFilterBar
          period={period}
          onPeriod={setPeriod}
          plant={plant}
          onPlant={setPlant}
          packaging={packaging}
          onPackaging={setPackaging}
          packagingOptions={packagingOptions}
          lastRefresh={lastRefresh}
          theme={theme}
          onThemeToggle={() => setTheme((x) => (x === 'dark' ? 'light' : 'dark'))}
          demo={demo}
          onDemo={setDemo}
          onReset={() => {
            setPeriod('YTD');
            setPlant('all');
            setPackaging('all');
          }}
          onExport={() => alert('Export would generate PDF/PNG/CSV with current filters (wire in backend).')}
          activeBreadcrumb={breadcrumb}
        />

        <div className="pet-divider" aria-hidden />

        <div style={{ marginTop: '1rem' }}>{content}</div>
      </main>
    </div>
  );
}
