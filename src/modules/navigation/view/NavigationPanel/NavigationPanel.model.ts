import { inject } from "inversify";
import { NavigationDataAccessInjectKey, NavigationItemCategoryMeta } from "@/modules/navigation/common/constants";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Section } from "@/modules/navigation/view/Section";
import { CollectionProps } from "@ui/Collection/types";
import Computed from "@common/hocs/withView/decorators/Computed";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";
import { makeAutoObservable } from "mobx";

class NavigationPanelModel {

  constructor(
    @inject(NavigationDataAccessInjectKey)
    private readonly navigationDataAccess: NavigationDataAccess
  ) {
    makeAutoObservable(this)
  }

  @OnMounted()
  public handleMounted() {
    this.navigationDataAccess.createNavigationItems();
  }

  public get getNavigationItemsProps(): CollectionProps {
    return {
      itemKey: NavigationItemCategoryMeta.Title,
      items: this.navigationDataAccess.getNavigationItems,
      Component: Section
    }
  }
}

export default NavigationPanelModel;
