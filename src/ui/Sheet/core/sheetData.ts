import { clearSheets, removeSheet } from "../slice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppDispatch = (action: any) => void;

let _dispatch: AppDispatch | null = null;
let _nextId = 0;
const _resolves = new Map<string, (value: unknown) => void>();
const _volatileProps = new Map<string, Record<string, unknown>>();

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

  setVolatileProps(id: string, props: Record<string, unknown>): void {
    _volatileProps.set(id, props);
  },

  getVolatileProps(id: string): Record<string, unknown> {
    return _volatileProps.get(id) ?? {};
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(action: any): void {
    _dispatch?.(action);
  },

  remove(id: string, result?: unknown): void {
    const fn = _resolves.get(id);
    _resolves.delete(id);
    _volatileProps.delete(id);
    fn?.(result);
    _dispatch?.(removeSheet(id));
  },

  removeAll(): void {
    _resolves.clear();
    _volatileProps.clear();
    _dispatch?.(clearSheets());
  },
};
