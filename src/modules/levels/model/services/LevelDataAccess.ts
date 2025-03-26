import EntityManager from "@common/store/entity/EntityManager";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { FormGroup } from "@common/store/form/FormGroup";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { injectable } from "inversify";
import State from "@common/hocs/withView/decorators/State";
import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";

@injectable()
class LevelDataAccess {

  @State()
  public levels: EntityManager<LevelEntity> = new EntityManager<LevelEntity>();

  @State()
  public createLevelRequest: FormGroup<CreateLevelEntity> = new FormGroup(new CreateLevelEntity());

  @State()
  public updateLevelRequest: FormGroup<UpdateLevelEntity> = new FormGroup(new UpdateLevelEntity());

  @Computed()
  private getLevelEntityManager(): EntityManager<LevelEntity>{
    return this.levels;
  };

  @Computed()
  public getLevelCreateForm(): FormGroup<CreateLevelEntity>{
    return this.createLevelRequest;
  };

  @Computed()
  public getLevelUpdateForm(): FormGroup<UpdateLevelEntity>{
    return this.updateLevelRequest
  };

  @Computed()
  public getLevelCollection(): Array<LevelEntity>{
    return this.levels.getCollection()
  };

  @Computed()
  public getLevelById(id: string): LevelEntity{
    return this.levels.getById(id);
  }

  @Action()
  public createLevel(level: LevelEntity): void {
    this.getLevelEntityManager().create(level)
  }

  @Action()
  public upsertLevels(levels:  LevelEntity[]){
    this.getLevelEntityManager().upsert(levels);
  }

  @Action()
  public setLevel(level: LevelEntity){
    this.getLevelEntityManager().set(level);
  }

  @Action()
  public removeLevel(levelId: string){
    this.getLevelEntityManager().remove(levelId);
  }
}

export default LevelDataAccess;
