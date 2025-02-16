import { Roles } from "@common/types/roles";
import { GuardRole, Loading, Validate } from "@common/store/async/utils";
import { LevelEndpoints } from "@/modules/levels/common/api/endpoints";
import { LevelByIdArgs, LevelCollectArgs, LevelRemoveArgs } from "@/modules/levels/common/api/types";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { ModalService } from "@common/services/modal/ModalService";
import CreateLevelModal from "@/modules/levels/view/containers/CreateLevelModal";
import { ModalEntity } from "@common/services/modal/ModalEntity";
import { LevelDataAccess } from "@/modules/levels/model/services/LevelDataAccess";
import { Inject } from "@common/utils/di/Inject";
import { LevelModule } from "@/modules/levels/model/services/LevelModule";
import { ModalServiceInjectKey } from "@common/services";
import LevelsApi from "@common/api/levels";
import { levelMappers } from "@/modules/levels/model/common/mappers";
import { Register } from "@common/utils/di/Register";
import { LifecycleType } from "@common/utils/di";

const getLoadingMs = 1000;
const mutateLoadingMs = 500;

@Register(LevelModule.LevelServiceInjectKey, LifecycleType.Singleton)
class LevelService {
  private readonly _levelApi: LevelsApi;
  private readonly _levelDataAccess: LevelDataAccess;
  private readonly _modalService: ModalService;

  private getLevelApi(): LevelsApi{
    return this._levelApi;
  };

  constructor(
    @Inject(LevelModule.LevelApiInjectKey) levelsApi: LevelsApi,
    @Inject(LevelModule.LevelDataAccessInjectKey) levelDataAccess: LevelDataAccess,
    @Inject(ModalServiceInjectKey) modalService: ModalService
  ) {
    this._levelApi = levelsApi;
    this._levelDataAccess = levelDataAccess;
    this._modalService = modalService;
    this._modalService.registerModal(new ModalEntity(CreateLevelModal));
  }

  public getLevelCreateForm() {
    return this._levelDataAccess.getLevelCreateForm();
  }
  public getLevelUpdateForm() {
    return this._levelDataAccess.getLevelUpdateForm();
  }
  public getLevelCollection() {
    return this._levelDataAccess.getLevelCollection();
  }

  @GuardRole(Roles.Common)
  @Loading(getLoadingMs)
  @Validate({ entity: CreateLevelEntity })
  public async createLevel() {

    const request = this._levelDataAccess.getLevelCreateForm().getFormStateValue().getEntity();
    await this.getLevelApi().create({ description: request.description, name: request.name });

    const level = new LevelEntity();
    level.name = request.name;
    level.description = request.description;

    this._levelDataAccess.createLevel(level)
  }

  @GuardRole(Roles.Common)
  @Loading(mutateLoadingMs)
  @Validate({ entity: UpdateLevelEntity })
  public async updateLevel() {

    const request = this._levelDataAccess.getLevelUpdateForm().getFormStateValue().getEntity();
    const response = await this.getLevelApi().update({ id: request.id, name: request.name, description: request.description });

    const level = this._levelDataAccess.getLevelById(response.id);
    level.name = response.name;
    level.description = response.description;

    this._levelDataAccess.setLevel(level)
  }

  @GuardRole(Roles.Common)
  @Loading(mutateLoadingMs)
  public async removeLevel(request: LevelRemoveArgs) {
    await this.getLevelApi()[LevelEndpoints.Remove](request);
    this._levelDataAccess.removeLevel(request.id)
  }

  @Loading(getLoadingMs)
  public async loadLevelCollection(request: LevelCollectArgs) {
    const response = await this.getLevelApi().collect({ ids: request.ids, page: request.page, size: request.size });
    this._levelDataAccess.upsertLevels(levelMappers.toAppLevels(response.records));
  }

  @Loading(getLoadingMs)
  public async loadLevelById(request: LevelByIdArgs) {
    const response = await this.getLevelApi().get(request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    this._levelDataAccess.setLevel(levelEntity)
  }
}

export default LevelService;