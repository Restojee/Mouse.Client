import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { inject } from "inversify";
import { NavigationDataAccessInjectKey, NavigationItemCategoryMeta } from "@/modules/navigation/common/constants";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Section } from "@/modules/navigation/view/Section";
import { CollectionProps } from "@ui/Collection/types";

class NavigationViewModel extends ViewModelWithLifecycle {

  // @Prop() selectedSection: string;
  // @Prop() selectedCategory: string;
  // @State() navigationState: NavigationState;

  constructor(
    @inject(NavigationDataAccessInjectKey)
    private readonly navigationDataAccess: NavigationDataAccess
  ) {
   super();
  }

  public getNavigationItemsProps(): CollectionProps {
    return {
      itemKey: NavigationItemCategoryMeta.Title,
      items: this.navigationDataAccess.getNavigationItemsEntityManager().getCollection(),
      Component: Section
    }
  }
}

export default NavigationViewModel;
