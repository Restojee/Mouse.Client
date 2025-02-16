import LevelService from "./LevelService";
import { Module } from "@common/hocs/types";
import { LevelModuleProps } from "@/modules/levels/model/common/types";
import { Inject } from "@common/utils/di/Inject";
import { Register } from "@common/utils/di/Register";
import { LifecycleType } from "@common/utils/di";

export const LevelModuleInjectKey = Symbol('LevelModule');
export const LevelApiInjectKey = Symbol('LevelApi');
export const LevelDataAccessInjectKey = Symbol('LevelDataAccess');
export const LevelServiceInjectKey = Symbol('LevelService');

@Register(LevelModuleInjectKey, LifecycleType.Singleton)
export class LevelModule implements Module<LevelModuleProps> {

  constructor(
    @Inject(LevelServiceInjectKey) private levelService: LevelService
  ) {}

  public create(): void {}
  public destroy(): void {}
  public getProps(): LevelModuleProps {
    return {
      levelService: this.levelService
    }
  }
}