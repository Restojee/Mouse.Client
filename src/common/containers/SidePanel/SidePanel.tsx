import * as React from "react";
import { Column, Paper } from "@ui/Layout";
import NavigationModule from "@/modules/navigation/view";

const SidePanel = () => {
  return (
    <Column width={300} py="sm" px="xs">
      <Paper bgColor="paletteBackgroundPrimary">
        <NavigationModule />
      </Paper>
    </Column>
  )
}

export default SidePanel;
