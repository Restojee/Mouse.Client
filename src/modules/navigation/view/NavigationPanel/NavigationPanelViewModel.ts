import { inject } from "inversify";
import { NavigationDataAccessInjectKey, NavigationItemCategoryMeta } from "@/modules/navigation/common/constants";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Section } from "@/modules/navigation/view/Section";
import { CollectionProps } from "@ui/Collection/types";
import Computed from "@common/hocs/withView/decorators/Computed";
import { Theme } from "@common/themes/core/Theme";
import { ThemeInjectKey } from "@common/themes/common/constants";

class NavigationPanelViewModel {

  constructor(
    @inject(NavigationDataAccessInjectKey)
    private readonly navigationDataAccess: NavigationDataAccess,

    @inject(ThemeInjectKey)
    public theme: Theme
  ) {
    console.log(theme.get())
  }

  @Computed()
  public get getNavigationItemsProps(): CollectionProps {
    return {
      itemKey: NavigationItemCategoryMeta.Title,
      items: this.navigationDataAccess.getNavigationItems,
      Component: Section
    }
  }
}

export default NavigationPanelViewModel;
