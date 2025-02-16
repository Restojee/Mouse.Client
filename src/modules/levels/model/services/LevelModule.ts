import LevelService from "./LevelService";
import { Module } from "@common/hocs/types";
import CoreModule from "@common/hocs/CoreModule";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { Inject } from "@common/utils/di/Inject";
import { Register } from "@common/utils/di/Register";

@Register(LevelModule.LevelModuleInjectKey)
export class LevelModule extends CoreModule implements Module<LevelModuleProps> {

  public static LevelModuleInjectKey = Symbol('LevelModule');
  public static LevelApiInjectKey = Symbol('LevelApi');
  public static LevelDataAccessInjectKey = Symbol('LevelDataAccess');
  public static LevelServiceInjectKey = Symbol('LevelService');

  public levelService: LevelService;

  constructor(@Inject(LevelModule.LevelServiceInjectKey) levelService: LevelService) {
    super();
    this.levelService = levelService;
  }

  public create(): void {
    // this.appInstance.add(LevelModule.LevelServiceInjectKey, new LevelService(
    //   this.appInstance.add(LevelModule.LevelApiInjectKey, new LevelsApi(
    //     this.appInstance.get<HttpHandler>(HttpInjectKey)
    //   )),
    //   this.appInstance.add(LevelModule.LevelDataAccessInjectKey, new LevelDataAccess()),
    //   this.appInstance.get<ModalService>(ModalServiceInjectKey)
    // ))
  }

  public destroy(): void {
    // this.appInstance.remove(LevelModule.LevelApiInjectKey);
    // this.appInstance.remove(LevelModule.LevelDataAccessInjectKey);
    // this.appInstance.remove(LevelModule.LevelServiceInjectKey)
  }

  public getProps(): LevelModuleProps {
    return {
      levelService: this.appInstance.get(LevelModule.LevelServiceInjectKey)
    }
  }
}