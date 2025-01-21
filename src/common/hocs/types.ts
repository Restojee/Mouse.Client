export interface Module<Props extends {}> {
  create(): void;
  destroy(): void;
  getProps(): Props
}