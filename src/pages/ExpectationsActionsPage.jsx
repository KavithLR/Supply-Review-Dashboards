import { useEffect, useState } from 'react';
import { expectationsSeed } from '../data/referenceTemplateData.js';

const STORAGE = 'itc-expectations-v1';

const ragToClass = (r) => (r === 'red' ? 'ref-rag-red' : r === 'amber' ? 'ref-rag-amber' : 'ref-rag-green');

function nextId() {
  return `E${Date.now().toString(36).toUpperCase()}`;
}

export function ExpectationsActionsPage() {
  const [rows, setRows] = useState(() => {
    const raw = localStorage.getItem(STORAGE);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return expectationsSeed;
      }
    }
    return expectationsSeed;
  });

  const [form, setForm] = useState({
    topic: '',
    target: '',
    current: '',
    rag: 'amber',
    owner: '',
    due: '',
    action: '',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(rows));
  }, [rows]);

  function addRow(e) {
    e?.preventDefault();
    if (!form.topic.trim() || !form.target.trim() || !form.current.trim() || !form.action.trim()) return;
    setRows((r) => [
      {
        id: nextId(),
        ...form,
      },
      ...r,
    ]);
    setForm({ topic: '', target: '', current: '', rag: 'amber', owner: '', due: '', action: '' });
  }

  function removeRow(id) {
    setRows((r) => r.filter((x) => x.id !== id));
  }

  function resetToSeed() {
    setRows(expectationsSeed);
  }

  return (
    <div className="ref-page ref-page--tight">
      <div className="ref-page-header" style={{ alignItems: 'flex-start' }}>
        <div>
          <h2 className="ref-title">Expectations &amp; actions</h2>
          <p className="ref-sub">Targets vs current (mock KPIs) — add rows; stored in this browser (localStorage).</p>
        </div>
        <button type="button" className="gfb-btn secondary" onClick={resetToSeed}>
          Reset to ITC seed
        </button>
      </div>

      <div className="card ref-card" style={{ marginBottom: '0.75rem' }}>
        <h3 className="card-title">Add expectation or action</h3>
        <p className="card-sub">Fill the fields, then <strong>Add</strong> — the table updates immediately.</p>
        <form className="action-form" onSubmit={addRow}>
          <div className="action-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <label>
              Topic / metric
              <input value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} required placeholder="e.g. Plan adherence" />
            </label>
            <label>
              Expectation (target)
              <input value={form.target} onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))} required placeholder="e.g. ≥ 95%" />
            </label>
            <label>
              Current
              <input value={form.current} onChange={(e) => setForm((f) => ({ ...f, current: e.target.value }))} required />
            </label>
            <label>
              RAG
              <select value={form.rag} onChange={(e) => setForm((f) => ({ ...f, rag: e.target.value }))}>
                <option value="green">green</option>
                <option value="amber">amber</option>
                <option value="red">red</option>
              </select>
            </label>
            <label>
              Owner
              <input value={form.owner} onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))} />
            </label>
            <label>
              Due
              <input value={form.due} onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))} type="date" />
            </label>
          </div>
          <label>
            Action
            <textarea
              value={form.action}
              onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))}
              rows={2}
              required
              placeholder="Concrete next step"
            />
          </label>
          <div className="action-form-actions">
            <button type="submit" className="gfb-btn primary">
              Add row
            </button>
          </div>
        </form>
      </div>

      <div className="card ref-card" style={{ overflow: 'auto' }}>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic / metric</th>
                <th>Expectation</th>
                <th>Current</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Due</th>
                <th>Action</th>
                <th aria-label="Remove" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.topic}</th>
                  <td>{row.target}</td>
                  <td>{row.current}</td>
                  <td>
                    <span className={ragToClass(row.rag)} style={{ textTransform: 'capitalize' }}>
                      {row.rag}
                    </span>
                  </td>
                  <td>{row.owner}</td>
                  <td>{row.due}</td>
                  <td>{row.action}</td>
                  <td>
                    <button type="button" className="gfb-btn secondary small" onClick={() => removeRow(row.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="ref-foot" style={{ marginTop: 12 }}>
        For enterprise governance, connect this to your same store as the &quot;actions&quot; upload on the Data upload tab; <code>expectation_id</code> can mirror
        <code> itc_template_expectations_actions.csv</code>.
      </p>
    </div>
  );
}
