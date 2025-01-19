import Store from "@common/store/store";
import { LevelState } from "@/modules/levels/model/common/types";
import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";

export class LevelDataAccess extends Store<LevelDataAccess, LevelState> {
  private readonly _levelEntityManager: EntityManager<LevelEntity>;

  private getLevelEntityManager(): EntityManager<LevelEntity>{
    return this._levelEntityManager;
  };

  public getLevelCreateForm = (): FormGroup<CreateLevelEntity> => this.getState().createLevel;
  public getLevelUpdateForm = (): FormGroup<UpdateLevelEntity> => this.getState().updateLevel;
  public getLevelCollection = (): Array<LevelEntity> => this.getState().levels.getCollection();
  public getLevelById = (id: string): LevelEntity => this.getState().levels.getById(id)

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