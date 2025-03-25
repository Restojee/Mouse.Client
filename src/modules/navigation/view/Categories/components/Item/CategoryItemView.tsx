import { Center } from "@ui/Layout";
import { Typography } from "@ui/Typography";
import { Icon } from "@ui/Icon";
import * as React from "react";
import { withView } from "@common/hocs/withView";
import CategoryItemViewModel from "@/modules/navigation/view/Categories/components/Item/CategoryItemViewModel";
import { WithViewProps } from "@common/hocs/withView/types";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";

type CategoryItemViewComponent = React.FC<WithViewProps<CategoryItemViewModel, CategoryItemViewProps>>;

const CategoryItemView: CategoryItemViewComponent = ({ viewModel }) => (
  <Center gap="sm" pa="sm">
    <Icon icon={viewModel.getIcon()} />
    <Typography color="palettePanelCategory" fontSize="lg">
      {viewModel.getTitle()}
    </Typography>
  </Center>
)

export default withView(CategoryItemView, CategoryItemViewModel);
