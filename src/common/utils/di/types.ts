export type Constructor<T> = new (...args: any[]) => T;

export enum LifecycleType {
  Singleton,
  Transient
}

export interface RegistrationOptions {
  constructor: Constructor<any>;
  lifecycle: LifecycleType;
  instance?: any;
}

export interface Disposable {
  dispose(): void;
}