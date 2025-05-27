import React from "react";
import Link from "@ui/Link/ui/Link";
import { Center } from "@ui/Layout";
import { Icon } from "@ui/Icon";
import { Typography } from "@ui/Typography";
import { withView } from "@common/hocs/withView";
import TagItemModel from "@/modules/tags/view/Tags/TagItem/TagItem.model";
import { WithViewProps } from "@common/hocs/withView/types";

const classRoot = 'UiTagItem';

interface Props {
  id: string;
  title: string;
  description?: string;
}
const TagItemView: React.FC<WithViewProps<TagItemModel, Props>> = ({ viewModel }) => (
  <Link
    className={classRoot}
    to={viewModel.urlWithTag}
    color="palettePanelCategory"
    fontSize="lg"
  >
    <Center gap="sm" pa="sm">
      <Typography>
        {viewModel.title}
      </Typography>
    </Center>
  </Link>
)

export default withView(TagItemView, TagItemModel);
