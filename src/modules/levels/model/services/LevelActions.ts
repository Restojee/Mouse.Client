import { Roles } from "@common/types/roles";
import { GuardRole, AsyncAction, Validate } from "@common/store/async/utils";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { UpdateLevelEntity } from "@/modules/levels/model/entities/UpdateLevelEntity";
import { CreateLevelEntity } from "@/modules/levels/model/entities/CreateLevelEntity";
import { ModalService } from "@common/services/modal/ModalService";
import CreateLevelModal from "@/modules/levels/view/containers/CreateLevel";
import { ModalEntity } from "@common/services/modal/ModalEntity";
import { levelMappers } from "@/modules/levels/model/common/mappers";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi from "@common/api/levels";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";
import { injectable } from "inversify";
import { LevelEndpoints } from "@common/api/levels/endpoints";
import { LevelByIdRequest, LevelCollectRequest, LevelRemoveRequest } from "@common/api/levels/models";

const getLoadingMs = 1000;
const mutateLoadingMs = 500;

@injectable()
class LevelActions {

  constructor(
    private readonly modalService: ModalService,
    private readonly levelsApi: LevelsApi,
    private readonly levelDataAccess: LevelDataAccess,
    private readonly levelSelectors: LevelSelectors,
  ) {
    this.modalService.registerModal(new ModalEntity(CreateLevelModal));
  }
  private getLevelApi(): LevelsApi{
    return this.levelsApi;
  };

  @GuardRole(Roles.Common)
  @AsyncAction(getLoadingMs)
  @Validate({ entity: CreateLevelEntity })
  public async createLevel() {

    const request = this.levelSelectors.getLevelCreateForm().getEntity;
    await this.getLevelApi().create({
      description: request.description,
      name: request.name
    });

    const level = new LevelEntity();
    level.name = request.name;
    level.description = request.description;

    this.levelDataAccess.createLevel(level)
  }

  @GuardRole(Roles.Common)
  @AsyncAction(mutateLoadingMs)
  @Validate({ entity: UpdateLevelEntity })
  public async updateLevel() {

    const request = this.levelSelectors.getLevelUpdateForm().getEntity;
    const response = await this.getLevelApi().update({
      id: request.id,
      name: request.name,
      description: request.description
    });

    const level = this.levelDataAccess.getLevelById(response.id);
    level.name = response.name;
    level.description = response.description;

    this.levelDataAccess.setLevel(level)
  }

  @GuardRole(Roles.Common)
  @AsyncAction(mutateLoadingMs)
  public async removeLevel(request: LevelRemoveRequest) {
    await this.getLevelApi()[LevelEndpoints.Remove](request);
    this.levelDataAccess.removeLevel(request.id)
  }

  @AsyncAction(getLoadingMs)
  public async loadLevelCollection(request: LevelCollectRequest) {
    const response = await this.getLevelApi().collect({
      ids: request.ids,
      page: request.page,
      size: request.size
    });
    this.levelDataAccess.upsertLevels(levelMappers.toAppLevels(response.records));
  }

  @AsyncAction(getLoadingMs)
  public async loadLevelById(request: LevelByIdRequest) {
    const response = await this.getLevelApi().get(request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    this.levelDataAccess.setLevel(levelEntity)
  }
}

export default LevelActions;
