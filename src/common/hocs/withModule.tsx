import * as React from "react";
import { InstanceKey } from "@common/utils/di/types";
import { Instance } from "@common/instances/Instance";
import { ModuleOptions } from "@common/hocs/types";

const withModule = <P extends Record<InstanceKey, any>>(props: ModuleOptions<P>) => {
  const { services, container, onDestroy, onCreate } = props;
  return () => {
    const Component = container;

    const servicesMap = React.useMemo((): P => {
      const servicesMap = {};
      for (const serviceKey in services) {
        servicesMap[serviceKey] = Instance.add(serviceKey);
      }
      return servicesMap as P;
    }, [services])

    React.useEffect(() => {
      onCreate?.();
      return onDestroy;
    }, [Component, module]);

    return <Component { ...servicesMap } />
  };
}

export default withModule;