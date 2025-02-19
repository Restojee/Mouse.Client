import { LevelState } from "@/modules/levels/model/common/types";
import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import Store from "@common/store/Store";
import { Register } from "@common/utils/di/Register";

export const LevelDataAccessInjectKey = 'LevelDataAccess';

@Register(LevelDataAccessInjectKey)
class LevelDataAccess extends Store<LevelDataAccess, LevelState> {

  private readonly _levelEntityManager: EntityManager<LevelEntity>;

  private getLevelEntityManager(): EntityManager<LevelEntity>{
    return this._levelEntityManager;
  };
  public getLevelCreateForm(): FormGroup<CreateLevelEntity>{
    return this.getState().createLevel;
  };
  public getLevelUpdateForm(): FormGroup<UpdateLevelEntity>{
    return this.getState().updateLevel
  };
  public getLevelCollection(): Array<LevelEntity>{
    return this.getState().levels.getCollection()
  };
  public getLevelById(id: string): LevelEntity{
    return this.getState().levels.getById(id);
  }

  constructor() {
    super()
    this.createState({
      levels: new EntityManager<LevelEntity>(),
      createLevel: new FormGroup(new CreateLevelEntity()),
      updateLevel: new FormGroup(new UpdateLevelEntity()),
    });
  }

  public createLevel(level: LevelEntity): void {
    this.getLevelEntityManager().create(level)
  }
  public upsertLevels(levels:  LevelEntity[]){
    this.getLevelEntityManager().upsert(levels);
  }
  public setLevel(level: LevelEntity){
    this.getLevelEntityManager().set(level);
  }
  public removeLevel(levelId: string){
    this.getLevelEntityManager().remove(levelId);
  }
}

export default LevelDataAccess;