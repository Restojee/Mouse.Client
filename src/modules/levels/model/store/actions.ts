import { LevelEndpoints } from '@/modules/levels/common/api/endpoints';
import {
  LevelByIdArgsType,
  LevelCollectArgsType,
  LevelCreateArgsType,
  LevelRemoveArgsType,
  LevelUpdateArgsType,
} from '@/modules/levels/common/api/types';
import LevelStore from '@/modules/levels/model/store/store';
import LevelsApi from '@/modules/levels/common/api/api';
import Async from '@common/store/async/Async';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';

const getLevelCollection = new Async<LevelCollectArgsType, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    const response = await levelApi[LevelEndpoints.Collect](request);
    getLevelEntityManager().upsert(response.records);
  }
)

const getLevelById = new Async<LevelByIdArgsType, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    const response = await levelApi[LevelEndpoints.ById](request);

    const levelEntity = new LevelEntity();
    levelEntity.setName(response.name)
    levelEntity.setId(response.id);

    getLevelEntityManager().set(levelEntity)
  }
)

const updateLevel = new Async<LevelUpdateArgsType, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    const response = await levelApi[LevelEndpoints.Update](request);
    getLevelEntityManager().update(request.id, {
      name: response.name,
      description: response.description
    })
  }
)

const createLevel = new Async<LevelCreateArgsType, LevelStore>().create(
  async (request, store, options) => {
    const { getInstance } = options;
    const levelApi = getInstance<LevelsApi>(LevelsApi.GlobalInjectKey);
    const { getLevelEntityManager } = store;

    await levelApi[LevelEndpoints.Create](request);

    const level = new LevelEntity();
    level.setName(request.name);
    level.setDescription(request.description);

    getLevelEntityManager().create(level)
  }
)

const removeLevel = new Async<LevelRemoveArgsType, LevelStore>().create(
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