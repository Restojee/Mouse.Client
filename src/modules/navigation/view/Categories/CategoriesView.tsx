import { CategoriesViewProps } from "@/modules/navigation/view/Categories/types";
import CategoriesViewModel from "@/modules/navigation/view/Categories/CategoriesViewModel";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import * as React from "react";
import { Column } from "@ui/Layout";
import { Theme } from "@common/themes/core/Theme";


const CategoriesView: React.FC<WithViewProps<CategoriesViewModel, CategoriesViewProps, [Theme]>> = ({ userId }) => {
  return (
    <Column gutter={2} pa="lg">
      <div>Общие разделы</div>
      <Column gutter={2} pa="sm">
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </Column>
    </Column>
  )
}

export default React.memo(withView(CategoriesView, CategoriesViewModel));
