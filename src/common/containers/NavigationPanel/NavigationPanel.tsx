import * as React from "react";
import { Column } from "@ui/Layout";
import CategoriesView from "@/modules/navigation/view/Categories/CategoriesView";

const NavigationPanel: React.FC = () => {
  return (
    <Column height={1}>
      <CategoriesView userId="testId" />
    </Column>
  )
}

export default React.memo(NavigationPanel);
