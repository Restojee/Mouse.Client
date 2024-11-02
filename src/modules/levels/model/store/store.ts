import {
  LevelByIdResponseType,
  LevelCollectArgsType,
  LevelCreateArgsType,
  LevelRemoveArgsType,
  LevelUpdateArgsType,
} from '@/modules/levels/common/api/types';
import { levelActions } from '@/modules/levels/model/store/actions';
import { levelSelectors } from '@/modules/levels/model/store/selectors';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';
import Store from '@common/store/store';
import { LevelEntityCollection, LevelMapById } from '@/modules/levels/model/common/types';
import EntityManager from '@common/store/entity/EntityManager';
import Selector from '@common/store/selector/Selector';
import { AsyncAction } from '@common/store/async/types';

class LevelStore extends Store<LevelStore> {

  public static GlobalInjectKey = 'LevelStoreKey';

  public readonly fetchLevelCollection: AsyncAction<LevelCollectArgsType>;
  public readonly fetchLevel: AsyncAction<LevelByIdResponseType>;
  public readonly updateLevel: AsyncAction<LevelUpdateArgsType>;
  public readonly createLevel: AsyncAction<LevelCreateArgsType>;
  public readonly removeLevel: AsyncAction<LevelRemoveArgsType>;

  public readonly getLevelCollection: Selector<{}, LevelEntityCollection>;
  public readonly getLevelMap: Selector<{}, LevelMapById>;
  public readonly getLevel: Selector<{}, LevelEntity>;

  private readonly _levelEntityManager: EntityManager<LevelEntity>;

  constructor() {
    super();

    this.bindActions(
      levelActions.getLevelCollection,
      levelActions.getLevelById,
      levelActions.updateLevel,
      levelActions.createLevel,
      levelActions.removeLevel,
    )

    this.bindSelectors(
      levelSelectors.getLevelCollection,
      levelSelectors.getLevelById,
      levelSelectors.getLevelMap,
    )

  }

  public getLevelEntityManager() {
    return this._levelEntityManager;
  }


}

export default LevelStore;