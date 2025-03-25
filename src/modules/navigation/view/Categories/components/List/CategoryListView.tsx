import { withView } from "@common/hocs/withView";
import * as React from "react";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";
import { WithViewProps } from "@common/hocs/withView/types";
import CategoryListViewModel from "@/modules/navigation/view/Categories/components/List/CategoryListViewModel";
import { CategoryListViewProps } from "@/modules/navigation/view/Categories/common/types";

type CategoryListViewComponent = React.FC<WithViewProps<CategoryListViewModel, CategoryListViewProps>>;

const CategoryListView: CategoryListViewComponent = ({ viewModel }) => (
  <Column gutter={2} py="sm" px="xs">
    <Collection {...viewModel.getCategoryItemProps()} />
  </Column>
);

export default withView(CategoryListView, CategoryListViewModel);
