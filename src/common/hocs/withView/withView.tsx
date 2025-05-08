import * as React from "react";
import { observer } from "mobx-react-lite";
import { DIContext } from "@common/hooks/useInjection";
import { Constructor } from "@common/utils/di/types";
import ViewModel from "@common/hocs/withView/ViewModel";
import { WithoutViewModel, WithViewProps } from "@common/hocs/withView/types";

function withView<
  Instance extends ViewModel<Props>,
  Props extends {} = {},>(
  ViewComponent: React.FC<WithViewProps<Instance, Props>>,
  ViewModelClass: Constructor<Instance>
) {
  const ObservedView = observer(ViewComponent);

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

        viewModel.setProps(props as Props)

        return viewModel;
      }
    );

    React.useEffect(() => {
      viewModel.setProps(props as Props);
    }, [props]);

    if (!container) {
      throw new Error("DI container not found. Ensure withModule is used.");
    }

    return <ObservedView {...props as Props} viewModel={viewModel} />;
  };
}

export default withView;
