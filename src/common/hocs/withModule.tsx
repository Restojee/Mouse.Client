import React from "react";
import { Module } from "@common/hocs/types";

const withModule = <P extends {}>(Component: React.FunctionComponent<P>, module: Module<P>) => {
  React.useEffect(() => {
    module.create();
    return module.destroy
  }, [Component, module])
  return <Component { ...module.getProps() } />;
}

export default withModule;