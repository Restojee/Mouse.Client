import * as React from "react";
import { Column } from "@ui/Layout";
import { Section } from "@/modules/navigation/view/Section";
import Collection from "@ui/Collection/Collection";
import { withView } from "@common/hocs/withView";
import NavigationPanelService from "@/modules/navigation/view/NavigationPanel/NavigationPanel.service";
import { WithViewProps } from "@common/hocs/withView/types";

const NavigationPanel: React.FC<WithViewProps<NavigationPanelService>> = ({ viewModel }) => (
  <Column width={1} height="initial">
    <Collection
      itemKey={viewModel.getNavigationItemKey()}
      items={viewModel.getNavigationItems()}
      Component={Section}
    />
  </Column>
)

export default React.memo(withView<NavigationPanelService>(NavigationPanel, NavigationPanelService));
