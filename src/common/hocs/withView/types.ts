import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";

export type WithViewProps<Instance extends ViewModelWithLifecycle<Props>, Props = {}> = {
  viewModel: Instance;
} & Props;

export type WithoutViewModel<Props> = Omit<Props, "viewModel">;
