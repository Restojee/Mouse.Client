import { Center } from "@ui/Layout";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItem from "@/modules/navigation/view/Categories/components/Item/CategoryItem";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItem, CategoryItemViewProps>>;

const CategoryItemView: CategoryItemViewComponent = ({ viewModel }) => (
  <Center gap="sm" pa="sm">
    <Icon icon={viewModel.icon} />
    <Typography color="palettePanelCategory" fontSize="lg">
      {viewModel.title}
    </Typography>
  </Center>
)

export default withView(CategoryItemView, CategoryItem);
