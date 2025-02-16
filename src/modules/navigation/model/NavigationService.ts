import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Inject } from "@common/utils/di/Inject";
import NavigationModule from "@/modules/navigation/model/NavigationModule";
import { Register } from "@common/utils/di/Register";

@Register(NavigationModule.NavigationServiceInjectKey)
export class NavigationService {
  private readonly _navigationDataAccess: NavigationDataAccess;
  constructor(@Inject(NavigationModule.NavigationDataAccessInjectKey)navigationDataAccess: NavigationDataAccess) {
    this._navigationDataAccess = navigationDataAccess;
  }
}