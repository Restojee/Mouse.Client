import * as React from "react";
import { Column, Paper } from "@/common";

const NavigationPanel: React.FC = () => {
  return (
    <Column height={1}>
      <Paper bgColor="primary">
        Panel
      </Paper>
    </Column>
  )
}

export default React.memo(NavigationPanel);