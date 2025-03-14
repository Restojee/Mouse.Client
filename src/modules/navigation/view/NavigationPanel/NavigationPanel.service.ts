import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { inject } from "inversify";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/types";

class NavigationPanelService extends ViewModelWithLifecycle<{}, [NavigationDataAccess]> {
  constructor(
    @inject(NavigationDataAccessInjectKey) private readonly navigationDataAccess: NavigationDataAccess
  ) {
   super(navigationDataAccess);
  }

  public getNavigationItems(): CategoryItemViewProps[] {
    return this.navigationDataAccess.getNavigationItemsEntityManager().getCollection();
  }

  public getNavigationItemKey(): keyof CategoryItemViewProps {
    return "title";
  }
}

export default NavigationPanelService;
