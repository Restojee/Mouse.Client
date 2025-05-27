import { Center, Flex } from "@ui/Layout";
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItem from "@/modules/navigation/view/Categories/components/Item/CategoryItem";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";
import Link from "@ui/Link/ui/Link";
import { Typography } from "@ui/Typography";

import "./CategoryItem.scss"

const classRoot = 'UiCategoryItem';

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItem, CategoryItemViewProps>>;
const CategoryItemView: CategoryItemViewComponent = ({ viewModel }) => {

  return (
    <Link
      className={classRoot}
      to={viewModel.urlWithCategory}
      color="palettePanelCategory"
      fontSize="lg"
    >
      <Flex gap="sm" pa="sm" align="center" justify="start" direction="row" width="100%">
        <Center width={24} height={24} nonIntegration>
        <Icon icon={viewModel.icon} />
        </Center>
        <Typography ellipsis>
          {viewModel.title}
        </Typography>
      </Flex>
    </Link>
  )
}

export default withView(CategoryItemView, CategoryItem);
