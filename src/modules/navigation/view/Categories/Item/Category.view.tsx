import { Row } from "@ui/Layout";
import { Typography } from "@ui/Typography";
import * as React from "react";

const CategoryItemView: React.FC = () => {
  return (
    <Row pa="sm">
      <Typography
        color="palettePanelCategory"
        fontSize="lg"
      >
        t('Navigation.Favorites')
      </Typography>
    </Row>
  )
}

export default React.memo(CategoryItemView);
