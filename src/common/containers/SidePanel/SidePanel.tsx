import * as React from "react";
import { Column, Paper } from "@ui/Layout";
import NavigationPanel from "@common/containers/NavigationPanel/NavigationPanel";

const SidePanel = () => {
  return (
    <Column width={300} height={1}>
      <Paper bgColor="paletteBackgroundPrimary">
        <NavigationPanel />
      </Paper>
    </Column>
  )
}

export default SidePanel;
