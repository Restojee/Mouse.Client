import * as React from "react";
import { Module } from "@common/hocs/types";
import { Constructor } from "@common/utils/di/types";
import { Instance } from "@common/instances/Instance";

interface Options<P> {
  container: React.FunctionComponent<P>,
  moduleKey: symbol,
  module: Constructor
}
const withModule = <P extends {}>({ moduleKey, module, container }: Options<P>): React.FC => {
  const moduleInstance: Module<P> = Instance.add(moduleKey)
  const Component = container;
  return () => {
    React.useEffect(() => {
      moduleInstance.create();
      return moduleInstance.destroy
    }, [Component, module])
    return <Component { ...moduleInstance.getProps() } />
  };
}

export default withModule;