import { ITC_DASHBOARD_REFRESH } from '../config/itcMeta.js';

/** One line under main titles: “Refreshed on &lt;timestamp&gt;”. */
export function RefreshedOn({ className = '' }) {
  return <p className={className ? `itc-refreshed-on ${className}` : 'itc-refreshed-on'}>Refreshed on {ITC_DASHBOARD_REFRESH}</p>;
}
