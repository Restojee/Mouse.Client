import { action, computed, makeObservable, observable } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";
export function createObservers<T extends {}>(instance: T): void {
  const observableDefs: Record<string, any> = {};

  const metadataMap: [string, any][] = [
    [Metadata.input, observable],
    [Metadata.computed, computed],
    [Metadata.action, action],
    [Metadata.state, observable],
  ];

  for (const [metaKey, decorator] of metadataMap) {
    const keys: string[] = Reflect.getMetadata(metaKey, instance.constructor) || [];
    for (const key of keys) {
      observableDefs[key] = decorator;
    }
  }

  makeObservable(instance, observableDefs);
}
