import { makeObservable, observable, reaction, runInAction } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";

const initializedInstances = new WeakSet<object>();

abstract class ViewModel<Props extends {} = {}> {
  constructor() {
    this.callOnInit();
  }

  public setProps(props: Props): void {

    runInAction(() => {
      const propKeys: string[] =
        Reflect.getMetadata(Metadata.PropFieldsKey, this.constructor) || [];

      if (!initializedInstances.has(this)) {
        const observableDefs: Record<string, any> = {};
        for (const key of propKeys) {
          observableDefs[key] = observable.ref;
        }
        makeObservable(this, observableDefs);
        initializedInstances.add(this);
      }

      this.bindWatchers();

      propKeys.forEach(propKey => this[propKey] = props[propKey])
    })
  }

  private bindWatchers(): void {
    const watchers =
      Reflect.getMetadata(Metadata.watchers, this.constructor) || [];

    watchers.forEach(({ propertyFn, handlerName }) => {
      reaction(
        () => propertyFn(this),
        (newValue, oldValue) => {
          this[handlerName]?.(newValue, oldValue);
        },
        { fireImmediately: true }
      );
    })
  }

  private callOnInit(): void {
    const inits: string[] =
      Reflect.getMetadata(Metadata.onInit, this.constructor) || [];

    runInAction(() => {
      inits.forEach(method => this[method]?.())
    })
  }
}
export default ViewModel;
