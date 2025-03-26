import * as React from "react";
import { Column } from "@ui/Layout";
import Collection from "@ui/Collection/Collection";
import { withView } from "@common/hocs/withView";
import NavigationViewModel from "@/modules/navigation/view/NavigationPanel/NavigationViewModel";
import { WithViewProps } from "@common/hocs/withView/types";


type NavigationPanelComponent = React.FC<WithViewProps<NavigationViewModel>>

const NavigationPanel: NavigationPanelComponent =
  ({ viewModel }) => (
    <Column width={1} nonIntegrated>
      <Collection {...viewModel.getNavigationItemsProps() } />
    </Column>
  )

export default withView<NavigationViewModel>(NavigationPanel, NavigationViewModel);
