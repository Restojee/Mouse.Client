import Store from '@common/store/store';
import EntityManager from '@common/store/entity/EntityManager';
import { Roles } from "@common/types/roles";
import { GuardRole, Loading, Validate } from "@common/store/async/utils";
import LevelsApi from "@/modules/levels/common/api/api";
import { LevelEndpoints } from "@/modules/levels/common/api/endpoints";
import { LevelByIdArgs, LevelCollectArgs, LevelRemoveArgs } from "@/modules/levels/common/api/types";
import { LevelState } from "@/modules/levels/model/common/types";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { FormSchema } from "@common/store/form/FormSchema";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";



const getLoadingMs = 1000;
const mutateLoadingMs = 500;

class LevelStore extends Store<LevelStore, LevelState> {

  private readonly _levelEntityManager: EntityManager<LevelEntity>;
  private readonly _levelApi: LevelsApi;

  private getLevelEntityManager = (): EntityManager<LevelEntity> => this._levelEntityManager;
  private getLevelApi = (): LevelsApi => this._levelApi;

  constructor() {
    super()
    this._levelApi = new LevelsApi();
    this.createState(({ withForm }) => ({
      levels: new EntityManager<LevelEntity>(),
      createLevel: withForm(new CreateLevelEntity()),
      updateLevel: withForm(new UpdateLevelEntity()),
    }));
  }

  public getLevelCreateForm = (): FormSchema<CreateLevelEntity> => this.getState().createLevel;
  public getLevelUpdateForm = (): FormSchema<UpdateLevelEntity> => this.getState().updateLevel;
  public getLevelCollection = (): Array<LevelEntity> => this.getState().levels.getCollection();
  public getLevelById = (id: string): LevelEntity => this.getState().levels.getById(id)

  @GuardRole(Roles.Common)
  @Loading(getLoadingMs)
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
  @Loading(mutateLoadingMs)
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
  @Loading(mutateLoadingMs)
  public async removeLevel(request: LevelRemoveArgs) {
    await this.getLevelApi()[LevelEndpoints.Remove](request);
    this.getLevelEntityManager().remove(request.id)
  }

  @Loading(getLoadingMs)
  public async loadLevelCollection(request: LevelCollectArgs) {
    const response = await this.getLevelApi()[LevelEndpoints.Collect](request);
    this.getLevelEntityManager().upsert(response.records);
  }

  @Loading(getLoadingMs)
  public async loadLevelById(request: LevelByIdArgs) {
    const response = await this.getLevelApi()[LevelEndpoints.ById](request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    this.getLevelEntityManager().set(levelEntity)
  }
}

export default LevelStore;