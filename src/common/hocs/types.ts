import * as React from "react";
import { Constructor, InstanceKey } from "@common/utils/di/types";

export interface Module<Props extends {} = {}> {
  create?(): void;
  destroy?(): void;
  getProps?(): Props
  //TODO extends IDisposable
}

export interface ModuleLifeCycle {
  onCreate(): void;
  onDestroy(): void;
}
export interface ModuleOptions<P> extends Partial<ModuleLifeCycle> {
  container: React.FunctionComponent<P>,
  key: InstanceKey,
  services: Record<string, Constructor>
}