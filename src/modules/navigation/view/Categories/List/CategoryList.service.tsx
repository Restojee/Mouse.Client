import { inject } from "inversify";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { Theme } from "@common/themes/core/Theme";
import { CategoryItem, CategoryListViewProps } from "@/modules/navigation/view/Categories/types";
import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { Typography } from "@ui/Typography";
import { Row } from "@ui/Layout";
import * as React from "react";
import { TypographyProps } from "@ui/Typography/common/types";
import CategoryItemView from "@/modules/navigation/view/Categories/Item/Category.view";

class CategoryListService extends ViewModelWithLifecycle<CategoryListViewProps, [Theme]> {
  constructor(@inject(ThemeInjectKey) private readonly theme: Theme) {
    super(theme);
    console.log(this.theme);
  }

  public getCategoryData(): CategoryItem[] {
    return this.useProps()?.categories;
  }

  public getCategoryKey(): keyof CategoryItem {
    return "title";
  }
}

export default CategoryListService;
