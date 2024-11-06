import { levelActions } from '@/modules/levels/model/store/actions';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';
import Store from '@common/store/store';
import EntityManager from '@common/store/entity/EntityManager';
import Selector from "@common/store/getter/Getter";
import { LevelEntityCollection, LevelFields, LevelMapById } from "@/modules/levels/model/common/types";
import {
  LevelByIdResponse,
  LevelCollectArgs,
  LevelCreateArgs,
  LevelRemoveArgs,
  LevelUpdateArgs,
} from "@/modules/levels/common/api/types";
import { AsyncAction } from "@common/store/async/types";
import { LevelState } from "@/modules/levels/model/store/types";
import { levelSelectors } from "@/modules/levels/model/store/selectors";

//bindAction - Оборачивать доп логику, например ошибки, лоадер
//bindSelector - Оборачивать доп стейт, ошибки, лоадер

class LevelStore extends Store<LevelStore, LevelState> {

  public static GlobalInjectKey = 'LevelStoreKey';

  private readonly _levelEntityManager: EntityManager<LevelEntity>;

  public readonly fetchLevelCollection: AsyncAction<LevelCollectArgs>;
  public readonly fetchLevel: AsyncAction<LevelByIdResponse>;
  public readonly updateLevel: AsyncAction<LevelUpdateArgs>;
  public readonly createLevel: AsyncAction<LevelCreateArgs>;
  public readonly removeLevel: AsyncAction<LevelRemoveArgs>;

  public readonly getLevelCollection: Selector<{}, LevelEntityCollection>;
  public readonly getLevelMap: Selector<{}, LevelMapById>;
  public readonly getLevel: Selector<{}, LevelEntity>;

  constructor() {
    super()

    this.createState({
      levels: this._levelEntityManager.getInitialState(),
    });

    this.fetchLevelCollection = this.bindAction(levelActions.getLevelCollection);
    this.fetchLevel = this.bindAction(levelActions.getLevelById);
    this.createLevel = this.bindAction(levelActions.createLevel);
    this.updateLevel = this.bindAction(levelActions.updateLevel);
    this.removeLevel = this.bindAction(levelActions.removeLevel);

    this.getLevel = this.bindSelector(levelSelectors.getLevelById);
    this.getLevelCollection = this.bindSelector(levelSelectors.getLevelCollection);
    this.getLevelMap = this.bindSelector(levelSelectors.getLevelMap);

  }

  public getLevelEntityManager() {
    return this._levelEntityManager;
  }
}

export default LevelStore;