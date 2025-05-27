import * as React from "react";
import { observer } from "mobx-react-lite";
import { DIContext } from "@common/hooks/useInjection";
import { Constructor } from "@common/utils/di/types";
import { WithoutViewModel, WithViewProps } from "@common/hocs/withView/types";
import { createInputs } from "@common/hocs/withView/utils/createInputs";
import { createObservers } from "@common/hocs/withView/utils/createObservers";
import { createWatchers } from "@common/hocs/withView/utils/createWatchers";
import { callOnInit } from "@common/hocs/withView/utils/callOnInit";

function withView<
  Instance,
  Props extends {} = {},>(
  ViewComponent: React.FC<WithViewProps<Instance, Props>>,
  ViewModelClass: Constructor<Instance>
) {

  return (props: WithoutViewModel<Props>) => {
    const container = React.useContext(DIContext);
    const [viewModel] = React.useState<Instance>(
      () => {
        let viewModel: Instance;
        try {
          viewModel = container.get(ViewModelClass);
        } catch (e) {
          // перехватывать только ошибки контейнера
          container.add(ViewModelClass, ViewModelClass);
          viewModel = container.get(ViewModelClass);
        }

        createInputs(viewModel, props);
        createObservers(viewModel);
        createWatchers(viewModel);
        callOnInit(viewModel);

        return viewModel;
      }
    );

    if (!container) {
      throw new Error("DI container not found. Ensure withModule is used.");
    }

    const ObservableViewComponent = observer(ViewComponent)

    return <ObservableViewComponent {...props as Props} viewModel={viewModel} />;
  };
}

export default withView;
