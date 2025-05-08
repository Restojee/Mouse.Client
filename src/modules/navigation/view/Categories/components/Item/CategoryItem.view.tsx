import { Center } from "@ui/Layout";
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItem from "@/modules/navigation/view/Categories/components/Item/CategoryItem";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";
import Link from "@ui/Link/ui/Link";
import { UrlBuilder, UrlNavigationParams } from "@common/services/router";
import { Typography } from "@ui/Typography";

import "./CategoryItem.scss"

const classRoot = 'UiCategoryItem';

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItem, CategoryItemViewProps>>;
const CategoryItemView: CategoryItemViewComponent = ({ viewModel }) => {

  const urlWithCategory = React.useMemo(() => UrlBuilder.create()
    .withParam(UrlNavigationParams.category, viewModel.id), [viewModel])

  return (
    <Link
      className={classRoot}
      to={urlWithCategory}
      color="palettePanelCategory"
      fontSize="lg"
    >
      <Center gap="sm" pa="sm">
        <Icon icon={viewModel.icon} />
        <Typography>
          {viewModel.title}
        </Typography>
      </Center>
    </Link>
  )
}

export default React.memo(withView(CategoryItemView, CategoryItem));
