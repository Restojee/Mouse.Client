import { Typography } from "@ui/Typography";
import * as React from "react";
import { SectionHeaderViewProps } from "@/modules/navigation/view/Section/types";

const SectionHeaderView = (props: SectionHeaderViewProps) => {
  return (
    <Typography
      fontSize="md"
      color="palettePanelSection"
      upperCase
      cantSelect
    >
      {props.title}
    </Typography>
  )
}

export default SectionHeaderView;
