import { LevelDataAccess } from "@/modules/levels/model/services/LevelDataAccess";
import { ModalService } from "@common/services/modal/ModalService";
import LevelService from "./LevelService";
import LevelsApi from "@/modules/levels/common/api/api";
import { Module } from "@common/hocs/types";
import CoreModule from "@common/hocs/CoreModule";
import { ModalServiceInjectKey } from "@common/services";
import { LevelModuleProps } from "@/modules/levels/model/common/types";

export class LevelModule extends CoreModule implements Module<LevelModuleProps> {

  public static LevelApiInjectKey = 'LevelApi';
  public static LevelDataAccessInjectKey = 'LevelDataAccess';
  public static LevelServiceInjectKey ='LevelService';

  public create(): void {
    this.appInstance.add(LevelModule.LevelServiceInjectKey, new LevelService(
      this.appInstance.add(LevelModule.LevelApiInjectKey, new LevelsApi()),
      this.appInstance.add(LevelModule.LevelDataAccessInjectKey, new LevelDataAccess()),
      this.appInstance.get<ModalService>(ModalServiceInjectKey)
    ))
  }

  public destroy(): void {
    this.appInstance.remove(LevelModule.LevelApiInjectKey);
    this.appInstance.remove(LevelModule.LevelDataAccessInjectKey);
    this.appInstance.remove(LevelModule.LevelServiceInjectKey)
  }

  public getProps(): LevelModuleProps {
    return {
      levelService: this.appInstance.get(LevelModule.LevelServiceInjectKey)
    }
  }
}