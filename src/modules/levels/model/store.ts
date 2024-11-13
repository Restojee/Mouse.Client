import Store from '@common/store/store';
import EntityManager from '@common/store/entity/EntityManager';
import { Roles } from "@common/types/roles";
import { GuardRole, LoadingAfter, Validate } from "@common/store/async/utils";
import LevelsApi from "@/modules/levels/common/api/api";
import { LevelEndpoints } from "@/modules/levels/common/api/endpoints";
import { LevelByIdArgs, LevelCollectArgs, LevelRemoveArgs } from "@/modules/levels/common/api/types";
import { LevelState } from "@/modules/levels/model/common/types";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormSchema } from "@common/store/formSchema";

class LevelStore extends Store<LevelStore, LevelState> {

  private readonly _levelEntityManager: EntityManager<LevelEntity>;
  private readonly _levelApi: LevelsApi;

  private static getLoadingMs = 1000;
  private static mutateLoadingMs = 500;

  private getLevelEntityManager = (): EntityManager<LevelEntity> => this._levelEntityManager;
  private getLevelApi = (): LevelsApi => this._levelApi;

  constructor() {
    super()
    this._levelApi = new LevelsApi();
    this.createState(({ withForm }) => ({
      levels: new EntityManager<LevelEntity>(),
      createLevelForm: withForm(new CreateLevelEntity()),
      updateLevelForm: withForm(new UpdateLevelEntity()),
    }));
  }

  public getLevelCreateForm = (): FormSchema<CreateLevelEntity> => this.getState().createLevelForm;
  public getLevelUpdateForm = (): FormSchema<UpdateLevelEntity> => this.getState().updateLevelForm;
  public getLevelCollection = (): Array<LevelEntity> => this.getState().levels.getCollection();
  public getLevelById = (id: LevelEntity['id']): LevelEntity => this.getState().levels.getById(id)

  @GuardRole(Roles.Common)
  @LoadingAfter(LevelStore.getLoadingMs)
  @Validate({ entity: CreateLevelEntity })
  public async createLevel() {

    const request = this.getLevelCreateForm().getValue().getEntity();
    await this.getLevelApi()[LevelEndpoints.Create](request);

    const level = new LevelEntity();
    level.name = request.name;
    level.description = request.description;

    this.getLevelEntityManager().create(level)
  }

  @GuardRole(Roles.Common)
  @LoadingAfter(LevelStore.mutateLoadingMs)
  @Validate({ entity: UpdateLevelEntity })
  public async updateLevel() {
    const levelEntityManager = this.getLevelEntityManager();

    const request = this.getLevelUpdateForm().getValue().getEntity();
    const response = await this.getLevelApi()[LevelEndpoints.Update](request);

    const level = levelEntityManager.getById(response.id);
    level.name = response.name;
    level.description = response.description;

    levelEntityManager.set(level)
  }

  @GuardRole(Roles.Common)
  @LoadingAfter(LevelStore.mutateLoadingMs)
  public async removeLevel(@Validate() request: LevelRemoveArgs) {
    await this.getLevelApi()[LevelEndpoints.Remove](request);
    this.getLevelEntityManager().remove(request.id)
  }

  @LoadingAfter(LevelStore.getLoadingMs)
  public async loadLevelCollection(request: LevelCollectArgs) {
    const response = await this.getLevelApi()[LevelEndpoints.Collect](request);
    this.getLevelEntityManager().upsert(response.records);
  }

  @LoadingAfter(LevelStore.getLoadingMs)
  public async loadLevelById(request: LevelByIdArgs) {
    const response = await this.getLevelApi()[LevelEndpoints.ById](request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    this.getLevelEntityManager().set(levelEntity)
  }
}

export default LevelStore;