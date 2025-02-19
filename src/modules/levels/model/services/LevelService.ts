import { Roles } from "@common/types/roles";
import { GuardRole, Loading, Validate } from "@common/store/async/utils";
import { LevelEndpoints } from "@/modules/levels/common/api/endpoints";
import { LevelByIdArgs, LevelCollectArgs, LevelRemoveArgs } from "@/modules/levels/common/api/types";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { ModalService, ModalServiceInjectKey } from "@common/services/modal/ModalService";
import CreateLevelModal from "@/modules/levels/view/containers/CreateLevelModal";
import { ModalEntity } from "@common/services/modal/ModalEntity";
import { Inject } from "@common/utils/di/Inject";
import LevelsApi from "@common/api/levels";
import { levelMappers } from "@/modules/levels/model/common/mappers";
import { Register } from "@common/utils/di/Register";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import { LevelApiInjectKey } from "@common/api/levels/api";

const getLoadingMs = 1000;
const mutateLoadingMs = 500;

export const LevelServiceInjectKey = 'LevelService';

@Register(LevelServiceInjectKey)
class LevelService {

  constructor(
    @Inject(LevelApiInjectKey) private levelsApi: LevelsApi,
    @Inject(LevelServiceInjectKey) private levelDataAccess: LevelDataAccess,
    @Inject(ModalServiceInjectKey) private modalService: ModalService
  ) {
    console.log('test')
    console.log(levelsApi, levelDataAccess, modalService)
    this.modalService.registerModal(new ModalEntity(CreateLevelModal));
  }

  private getLevelApi(): LevelsApi{
    return this.levelsApi;
  };
  public getLevelCreateForm() {
    return this.levelDataAccess.getLevelCreateForm();
  }
  public getLevelUpdateForm() {
    return this.levelDataAccess.getLevelUpdateForm();
  }
  public getLevelCollection() {
    return this.levelDataAccess.getLevelCollection();
  }

  @GuardRole(Roles.Common)
  @Loading(getLoadingMs)
  @Validate({ entity: CreateLevelEntity })
  public async createLevel() {

    const request = this.levelDataAccess.getLevelCreateForm().getFormStateValue().getEntity();
    await this.getLevelApi().create({ description: request.description, name: request.name });

    const level = new LevelEntity();
    level.name = request.name;
    level.description = request.description;

    this.levelDataAccess.createLevel(level)
  }

  @GuardRole(Roles.Common)
  @Loading(mutateLoadingMs)
  @Validate({ entity: UpdateLevelEntity })
  public async updateLevel() {

    const request = this.levelDataAccess.getLevelUpdateForm().getFormStateValue().getEntity();
    const response = await this.getLevelApi().update({ id: request.id, name: request.name, description: request.description });

    const level = this.levelDataAccess.getLevelById(response.id);
    level.name = response.name;
    level.description = response.description;

    this.levelDataAccess.setLevel(level)
  }

  @GuardRole(Roles.Common)
  @Loading(mutateLoadingMs)
  public async removeLevel(request: LevelRemoveArgs) {
    await this.getLevelApi()[LevelEndpoints.Remove](request);
    this.levelDataAccess.removeLevel(request.id)
  }

  @Loading(getLoadingMs)
  public async loadLevelCollection(request: LevelCollectArgs) {
    const response = await this.getLevelApi().collect({ ids: request.ids, page: request.page, size: request.size });
    this.levelDataAccess.upsertLevels(levelMappers.toAppLevels(response.records));
  }

  @Loading(getLoadingMs)
  public async loadLevelById(request: LevelByIdArgs) {
    const response = await this.getLevelApi().get(request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    this.levelDataAccess.setLevel(levelEntity)
  }
}

export default LevelService;