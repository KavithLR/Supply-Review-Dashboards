import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DashboardDataProvider } from './context/DashboardDataContext.jsx';
import './styles/theme.css';
import './App.css';

class AppErrorBoundary extends React.Component {
  state = { err: null };

  static getDerivedStateFromError(err) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 720 }}>
          <h1 style={{ fontSize: '1.1rem' }}>Something went wrong</h1>
          <p style={{ color: '#c00', whiteSpace: 'pre-wrap' }}>{String(this.state.err?.message || this.state.err)}</p>
          <p style={{ color: '#444', fontSize: 14 }}>
            If the page was blank, open the browser <strong>Developer tools → Console</strong> for the full error. Stale <code>localStorage</code> can
            break the app: try a private window, or run <code>localStorage.clear()</code> in the console, then refresh.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

const el = document.getElementById('root');
if (!el) {
  throw new Error('Missing #root in index.html');
}
ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <DashboardDataProvider>
        <App />
      </DashboardDataProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
