const findTextNode = (root: HTMLElement, targetOffset: number): { node: Text; offset: number } | null => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let remaining = targetOffset;
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (remaining <= node.length) return { node, offset: remaining };
    remaining -= node.length;
  }
  return null;
};

export const getSelectionOffsets = (div: HTMLDivElement): { start: number; end: number } => {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return { start: 0, end: 0 };
  const range = sel.getRangeAt(0);

  const getOffset = (container: Node, nodeOffset: number): number => {
    const r = document.createRange();
    r.selectNodeContents(div);
    r.setEnd(container, nodeOffset);
    return r.toString().length;
  };

  return {
    start: getOffset(range.startContainer, range.startOffset),
    end: getOffset(range.endContainer, range.endOffset),
  };
};

export const setSelectionOffsets = (div: HTMLDivElement, start: number, end: number): void => {
  const sel = window.getSelection();
  if (!sel) return;

  const startResult = findTextNode(div, start);
  const range = document.createRange();

  if (!startResult) {
    range.selectNodeContents(div);
    range.collapse(false);
  } else {
    range.setStart(startResult.node, startResult.offset);
    if (start !== end) {
      const endResult = findTextNode(div, end);
      if (endResult) range.setEnd(endResult.node, endResult.offset);
      else range.collapse(true);
    } else {
      range.collapse(true);
    }
  }

  sel.removeAllRanges();
  sel.addRange(range);
};
