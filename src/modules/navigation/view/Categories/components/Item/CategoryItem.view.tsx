import { Center } from "@ui/Layout";
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItem from "@/modules/navigation/view/Categories/components/Item/CategoryItem";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";
import Link from "@ui/Link/ui/Link";
import { UrlBuilder, UrlNavigationParams } from "@common/services/router";

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItem, CategoryItemViewProps>>;
const CategoryItemView: CategoryItemViewComponent = ({ viewModel }) => {

  const urlWithCategory = React.useMemo(() => UrlBuilder.create('/')
    .withParam(UrlNavigationParams.category, viewModel.id), [viewModel])

  return (
    <Center gap="sm" pa="sm">
      <Icon icon={viewModel.icon} />
      <Link to={urlWithCategory} color="palettePanelCategory" fontSize="lg">
        {viewModel.title}
      </Link>
    </Center>
  )
}

export default withView(CategoryItemView, CategoryItem);
