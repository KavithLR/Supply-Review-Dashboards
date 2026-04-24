/** 4-bucket RAG for production adherence % (reference wireframe) */
export function refAdherenceCellClass(pct) {
  if (pct == null || Number.isNaN(pct)) return 'ref-cell-na';
  if (pct <= 80) return 'ref-bucket-1';
  if (pct <= 90) return 'ref-bucket-2';
  if (pct <= 95) return 'ref-bucket-3';
  return 'ref-bucket-4';
}
