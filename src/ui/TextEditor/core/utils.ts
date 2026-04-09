export const findMentionTriggerStart = (value: string, cursorPos: number): number => {
  for (let i = cursorPos - 1; i >= 0; i--) {
    const ch = value[i];
    if (ch === "@") {
      const before = value[i - 1];
      if (before === undefined || before === " " || before === "\n") return i;
      return -1;
    }
    if (ch === " " || ch === "\n") return -1;
  }
  return -1;
};
