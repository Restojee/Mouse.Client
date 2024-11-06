import { LevelEndpoints } from '@/modules/levels/common/api/endpoints';
import {
  LevelByIdArgs,
  LevelCollectArgs,
  LevelCreateArgs,
  LevelRemoveArgs,
  LevelUpdateArgs,
} from '@/modules/levels/common/api/types';
import LevelStore from '@/modules/levels/model/store/store';
import LevelsApi from '@/modules/levels/common/api/api';
import Async from '@common/store/async/Async';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';

const getLevelCollection = new Async<LevelCollectArgs, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    const response = await levelApi[LevelEndpoints.Collect](request);
    getLevelEntityManager().upsert(response.records);
  }
)

const getLevelById = new Async<LevelByIdArgs, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    const response = await levelApi[LevelEndpoints.ById](request);

    const levelEntity = new LevelEntity();
    levelEntity.name = response.name;
    levelEntity.id = response.id;

    getLevelEntityManager().set(levelEntity)
  }
)

const updateLevel = new Async<LevelUpdateArgs, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;
    const levelEntityManager = getLevelEntityManager();

    const response = await levelApi[LevelEndpoints.Update](request);

    const level = levelEntityManager.getById(response.id);
    level.name = response.name;
    level.description = response.description;

    getLevelEntityManager().set(level)
  }
)

const createLevel = new Async<LevelCreateArgs, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    await levelApi[LevelEndpoints.Create](request);

    const level = new LevelEntity();
    level.name = request.name;
    level.description = request.description;

    getLevelEntityManager().create(level)
  }
)

const removeLevel = new Async<LevelRemoveArgs, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    await levelApi[LevelEndpoints.Remove](request);

    getLevelEntityManager().remove(request.id)
  }
)

export const levelActions = {
  getLevelCollection,
  getLevelById,
  updateLevel,
  createLevel,
  removeLevel,
}