import ViewModel from "@common/hocs/withView/ViewModel";

export type WithViewProps<Instance extends ViewModel<Props>, Props = {}> = {
  viewModel: Instance;
} & Props;

export type WithoutViewModel<Props> = Omit<Props, "viewModel">;
