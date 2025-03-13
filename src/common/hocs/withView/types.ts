import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";

export type WithViewProps<Instance extends ViewModelWithLifecycle<Props, Deps>, Props = {}, Deps extends any[] = []> = {
  viewModel: Instance;
} & Props;

export type WithoutViewModel<Props> = Omit<Props, "viewModel">;
