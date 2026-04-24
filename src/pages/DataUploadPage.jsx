import { useRef, useState } from 'react';
import { RefreshedOn } from '../components/RefreshedOn.jsx';
import { ThemeToggle } from '../components/ThemeToggle.jsx';
import { DemoModeToggle } from '../components/DemoModeToggle.jsx';
import { useDashboardData } from '../context/DashboardDataContext.jsx';
import { ITC_METRIC_TEMPLATE_GROUPS, downloadMetricTemplate, downloadAllItcTemplates } from '../utils/csvTemplates.js';

/**
 * ITC Supply Review — data upload hub (same pattern as the reference GitHub app:
 * templates per tab + actions / reason-code CSV + generic audit).
 */
export function DataUploadPage({ theme, onThemeToggle, demo, onDemo }) {
  const {
    upsertActionsFromCsvText,
    mergeReasonsFromCsvText,
    recordGenericUpload,
    auditLog,
    mergeDsaFromDemandCsv,
    mergeDsaFromSupplyCsv,
    resetDemandSupplyDemo,
  } = useDashboardData();
  const [msg, setMsg] = useState('');
  const genericInputRef = useRef(null);

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result || ''));
      r.onerror = reject;
      r.readAsText(file);
    });
  }

  async function onActionsFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = upsertActionsFromCsvText(text, f.name);
    setMsg(res.ok ? `S&OP actions: merged ${res.count} row(s) by action_id.` : res.message);
    e.target.value = '';
  }

  async function onReasonsFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = mergeReasonsFromCsvText(text, f.name);
    setMsg(res.ok ? `OTIF reason codes: merged ${res.count} row(s).` : res.message);
    e.target.value = '';
  }

  async function onGenericMetric(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    await readFile(f);
    recordGenericUpload(`Staged: ${f.name} (map columns in integration)`);
    setMsg(`Received ${f.name} — audit logged. Connect sheet → ITC metric store in backend.`);
    e.target.value = '';
  }

  async function onDsaDemandFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = mergeDsaFromDemandCsv(text);
    setMsg(res.ok ? `Demand: merged ${res.count} row(s) (keys: sku + plant + time).` : res.message);
    e.target.value = '';
  }

  async function onDsaSupplyFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const text = await readFile(f);
    const res = mergeDsaFromSupplyCsv(text);
    setMsg(res.ok ? `Supply / plan: merged ${res.count} row(s) (joins to demand on sku + plant + time).` : res.message);
    e.target.value = '';
  }

  return (
    <div className="grid-12" style={{ marginTop: 0 }}>
      <div className="span-12">
        <div className="card upload-hub-intro">
          <h3 className="card-title">ITC data upload &amp; templates</h3>
          <RefreshedOn />
          <p className="card-sub">
            Download <strong>CSV</strong> templates for each area. Upload the <strong>demand</strong> and <strong>supply (plan)</strong> feeds for the Demand supply alignment tab; S&amp;OP <strong>actions</strong> and
            <strong> OTIF reason</strong> files (same <code>action_id</code> or <code>client_code</code> updates existing rows). Other files are <strong>audit-staged</strong> until a backend is connected.
          </p>
          <div className="upload-hub-actions">
            <button type="button" className="gfb-btn primary" onClick={() => downloadAllItcTemplates()}>
              Download all ITC templates
            </button>
            <button type="button" className="gfb-btn secondary" onClick={() => genericInputRef.current?.click()}>
              Upload any metric CSV (audit)
            </button>
            <input ref={genericInputRef} type="file" accept=".csv,.txt" className="sr-only" onChange={onGenericMetric} />
          </div>
          {msg ? <p className="upload-msg">{msg}</p> : null}
        </div>
      </div>

      {ITC_METRIC_TEMPLATE_GROUPS.map((group) => (
        <div className="span-12" key={group.tab}>
          <div className="card template-group-card">
            <h3 className="card-title">{group.tab}</h3>
            <ul className="template-list">
              {group.items.map((item) => (
                <li key={item.id} className="template-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="template-filename">{item.filename}</span>
                  </div>
                  <button type="button" className="gfb-btn secondary small" onClick={() => downloadMetricTemplate(item)}>
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — Demand (DSA)</h3>
          <p className="card-sub">
            <code>itc_template_dsa_demand.csv</code> — <code>demand_priority</code> 1 = highest; <code>category</code> sample uses the same GitHub link as the demo. Keys merge on sku + plant + time.
          </p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose demand CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onDsaDemandFile} />
          </label>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — Production plan (DSA)</h3>
          <p className="card-sub">Same <code>sku, plant, time</code> as the demand file for a clean join. Optional: upload after demand.</p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose supply / plan CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onDsaSupplyFile} />
          </label>
        </div>
      </div>
      <div className="span-12" style={{ marginTop: 0 }}>
        <div className="card" style={{ padding: '0.9rem 1.1rem' }}>
          <button type="button" className="gfb-btn secondary" onClick={() => { resetDemandSupplyDemo(); setMsg('Demand & supply: restored demo data in this browser.'); }}>
            Reset Demand supply alignment to demo data
          </button>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — S&amp;OP / actions (CSV)</h3>
          <p className="card-sub">Columns per <code>itc_template_sop_actions.csv</code>. Same <code>action_id</code> replaces the row.</p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose actions CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onActionsFile} />
          </label>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Upload — OTIF client reason codes</h3>
          <p className="card-sub">Feeds the issue tree. Same <code>client_code</code> updates text / mapping.</p>
          <label className="upload-file-label">
            <span className="gfb-btn primary">Choose reasons CSV</span>
            <input type="file" accept=".csv,.txt" className="sr-only" onChange={onReasonsFile} />
          </label>
        </div>
      </div>

      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Display</h3>
          <p className="card-sub">Match the main filter bar; uses the same session as the top of the app.</p>
          <div className="admin-toggles">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <DemoModeToggle demo={demo} onChange={onDemo} />
          </div>
        </div>
      </div>
      <div className="span-6">
        <div className="card">
          <h3 className="card-title">Data quality (preview)</h3>
          <p className="card-sub">In production, validate keys, RCA mapping, and duplicates in the full pipeline.</p>
          <div className="dq-banners">
            <div className="dq-banner dq-warn">Generic metric files are audit-only until column mapping is saved per feed.</div>
          </div>
        </div>
      </div>

      <div className="span-12">
        <div className="card">
          <h3 className="card-title">Upload audit log</h3>
          <ul className="audit-list">
            {auditLog.length === 0 ? <li>No uploads yet in this browser.</li> : null}
            {auditLog.map((a, i) => (
              <li key={i}>
                <time>{a.time}</time> — <strong>{a.user}</strong>: {a.action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
