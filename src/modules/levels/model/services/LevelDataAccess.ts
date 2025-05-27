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

  public levels: EntityManager<LevelEntity> = new EntityManager<LevelEntity>();
  public createLevelRequest: FormGroup<CreateLevelEntity> = new FormGroup(new CreateLevelEntity());
  public updateLevelRequest: FormGroup<UpdateLevelEntity> = new FormGroup(new UpdateLevelEntity());

  private getLevelEntityManager(): EntityManager<LevelEntity>{
    return this.levels;
  };

  public getLevelCreateForm(): FormGroup<CreateLevelEntity>{
    return this.createLevelRequest;
  };

  public getLevelUpdateForm(): FormGroup<UpdateLevelEntity>{
    return this.updateLevelRequest
  };

  public getLevelCollection(): Array<LevelEntity>{
    return this.levels.getCollection
  };

  public getLevelById(id: string): LevelEntity{
    return this.levels.entities.get(id).entity;
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
