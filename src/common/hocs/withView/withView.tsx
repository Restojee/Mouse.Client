import * as React from "react";
import { observer } from "mobx-react-lite";
import { DIContext } from "@common/hooks/useInjection";
import { Constructor } from "@common/utils/di/types";
import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { WithoutViewModel, WithViewProps } from "@common/hocs/withView/types";

function withView<
  Instance extends ViewModelWithLifecycle<Props, Deps>,
  Props extends {} = {},
  Deps extends any[] = []>(
  ViewComponent: React.FC<WithViewProps<Instance, Props, Deps>>,
  ViewModelClass: Constructor<Instance, Deps>
) {
  const ObservedView = observer(ViewComponent);

  return (props: WithoutViewModel<Props>) => {
    const container = React.useContext(DIContext);
    if (!container) {
      throw new Error("DI container not found. Ensure withModule is used.");
    }

    let viewModel: Instance;
    try {
      viewModel = container.get(ViewModelClass);
    } catch (e) {
      container.add(ViewModelClass, ViewModelClass);
      viewModel = container.get(ViewModelClass);
    }

    React.useEffect(() => {
      viewModel.setProps(props as Props);
    }, [props])

    React.useEffect(() => {
      viewModel.init?.();
      return viewModel.destroy?.();
    }, [viewModel, props]);

    return <ObservedView {...props as Props} viewModel={viewModel} />;
  };
}

export default withView;
