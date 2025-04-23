import * as React from "react";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";
import { withView } from "@common/hocs/withView";
import NavigationPanelModel from "@/modules/navigation/view/NavigationPanel/NavigationPanel.model";
import { WithViewProps } from "@common/hocs/withView/types";
import { Section } from "@/modules/navigation/view/Section";


type NavigationPanelComponent = React.FC<WithViewProps<NavigationPanelModel>>

const NavigationPanel: NavigationPanelComponent =
  ({ viewModel }) => (
    <Column width={1} nonIntegrated>
      <Collection {...viewModel.getNavigationItemsProps() } />
    </Column>
  )

export default withView<NavigationPanelModel>(NavigationPanel, NavigationPanelModel);
