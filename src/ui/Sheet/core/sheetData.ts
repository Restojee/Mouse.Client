import { clearSheets, removeSheet } from "../slice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppDispatch = (action: any) => void;

let _dispatch: AppDispatch | null = null;
let _nextId = 0;
const _resolves = new Map<string, (value: unknown) => void>();

export const sheetData = {
  init(dispatch: AppDispatch) {
    _dispatch = dispatch;
  },

  nextId(): string {
    return `sheet-${++_nextId}`;
  },

  setResolve(id: string, fn: (value: unknown) => void): void {
    _resolves.set(id, fn);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(action: any): void {
    _dispatch?.(action);
  },

  remove(id: string, result?: unknown): void {
    const fn = _resolves.get(id);
    _resolves.delete(id);
    fn?.(result);
    _dispatch?.(removeSheet(id));
  },

  removeAll(): void {
    _resolves.clear();
    _dispatch?.(clearSheets());
  },
};
