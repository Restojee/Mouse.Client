import { Module } from "@common/hocs/types";
import { NavigationModuleProps } from "@/modules/navigation/common/types";
import { NavigationService } from "@/modules/navigation/model/NavigationService";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Inject } from "@common/utils/di/Inject";
import { Register } from "@common/utils/di/Register";

@Register(NavigationModule.NavigationModuleInjectKey)
class NavigationModule implements Module<NavigationModuleProps> {
  
    public static NavigationDataAccessInjectKey = Symbol('NavigationDataAccess');
    public static NavigationServiceInjectKey = Symbol('NavigationService');
    public static NavigationModuleInjectKey = Symbol('NavigationModule');

    public readonly navigationService: NavigationService;
    public readonly navigationDataAccess: NavigationDataAccess;

    constructor(
      @Inject(NavigationModule.NavigationServiceInjectKey) navigationService: NavigationService,
      @Inject(NavigationModule.NavigationDataAccessInjectKey) navigationDataAccess: NavigationDataAccess
    ) {
      this.navigationService = navigationService;
      this.navigationDataAccess = navigationDataAccess;
    }

    create(): void {
      // this.appInstance.add(NavigationModule.NavigationServiceInjectKey, new NavigationService(
      //   this.appInstance.add(NavigationModule.NavigationDataAccessInjectKey, new NavigationDataAccess()),
      // ))
    }

    destroy(): void {
      // TODO реализовать с IDisposable
      // this.appInstance.remove(NavigationModule.NavigationServiceInjectKey);
      // this.appInstance.remove(NavigationModule.NavigationDataAccessInjectKey);
    }

    public getProps(): NavigationModuleProps {
      return {
        navigationService: this.navigationService
      }
    }
  
}

export default NavigationModule;