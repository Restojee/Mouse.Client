import { CategoryItem, CategoryListViewProps } from "@/modules/navigation/view/Categories/types";
import { withView } from "@common/hocs/withView";
import * as React from "react";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";
import CategoryListService from "@/modules/navigation/view/Categories/List/CategoryList.service";
import CategoryItemView from "@/modules/navigation/view/Categories/Item/Category.view";

const CategoryListView = React.memo(
  withView<CategoryListService, CategoryListViewProps>(({ viewModel }) => (
    <Column gutter={2} py="sm" px="xs">
      <Collection<CategoryItem>
        Component={CategoryItemView}
        itemKey={viewModel.getCategoryKey()}
        items={viewModel.getCategoryData()}
      />
    </Column>
  ), CategoryListService)
);

export default CategoryListView;
