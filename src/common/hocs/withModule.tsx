import * as React from "react";
import { PropsWithChildren } from "react";
import { DIContext } from "@common/hooks/useInjection";
import { BindingScope, Instances } from "@common/instances/Instances";
import { ModuleOptions } from "@common/hocs/types";
import { createObservers } from "@common/hocs/withView/utils/createObservers";

const withModule = <P extends {}>(options: ModuleOptions<P>) => {

  const { providers, component } = options;

  return React.memo((props: PropsWithChildren<P>) => {
    const parentContainer = React.useContext(DIContext);

    const [container] = React.useState(() => {
      let newContainer = new Instances();

      if (parentContainer) {
        newContainer = parentContainer.createChildContainer();
      }

      newContainer.bind(providers, BindingScope.Singleton);

      providers.forEach(item => {
        createObservers(newContainer.get(item.key));
      })

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
