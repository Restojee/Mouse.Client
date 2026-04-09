export const getCaretPosition = (): { top: number; left: number } => {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return { top: 0, left: 0 };
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getBoundingClientRect();
  return { top: rect.bottom, left: rect.left };
};
