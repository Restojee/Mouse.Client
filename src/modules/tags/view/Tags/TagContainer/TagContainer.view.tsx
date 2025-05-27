import React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { TagContainerViewModel } from "@/modules/tags/view/Tags/TagContainer/TagContainer.model";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";

const TagContainerView: React.FC<WithViewProps<TagContainerViewModel>> = ({ viewModel }) => (
  <Column width={1} nonIntegrated>
    <Collection {...viewModel.tagCollectionProps} />
  </Column>
)

export default withView(TagContainerView, TagContainerViewModel);
