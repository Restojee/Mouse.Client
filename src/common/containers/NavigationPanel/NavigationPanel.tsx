import * as React from "react";
import { Column, Paper } from "@ui/Layout";

const NavigationPanel: React.FC = () => {
  return (
    <Column height={1}>
      <Paper bgColor="paletteBackgroundPrimary">
        Panel
      </Paper>
    </Column>
  )
}

export default React.memo(NavigationPanel);
