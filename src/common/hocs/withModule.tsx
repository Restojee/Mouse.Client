import * as React from "react";
import { DIContext } from "@common/hooks/useInjection";
import { Instances } from "@common/instances/Instances";
import { ModuleOptions } from "@common/hocs/types";
import { PropsWithChildren } from "react";

const withModule = <P extends {}>(options: ModuleOptions<P>) => {

  const { providers, component } = options;

  return React.memo((props: PropsWithChildren<P>) => {
    const [container] = React.useState(() => {
      const newContainer = new Instances();

      newContainer.bind(providers);

      console.log('newContainer ready for:', providers)

      return newContainer;
    });

    const Component = component;

    if (!container) {
      return null;
    }

    return (
      <DIContext.Provider value={container}>
        <Component {...props} />
      </DIContext.Provider>
    );
  });
}

export default withModule;
