import { useState } from 'react';
import { ITC_LOGO_URL } from '../config/itcDemoLinks.js';

export function ItcBrandMark() {
  const [ok, setOk] = useState(true);
  if (ok) {
    return (
      <img
        className="app-brand-mark"
        src={ITC_LOGO_URL}
        alt="ITC"
        width={40}
        height={40}
        onError={() => setOk(false)}
        loading="lazy"
      />
    );
  }
  return (
    <div className="app-brand-mark" title="ITC Supply Review" aria-hidden>
      ITC
    </div>
  );
}
