import LevelStore from '@/modules/levels/model/store/store';
import Selector from '@common/store/getter/Getter';
import { LevelByIdArgs } from '@/modules/levels/common/api/types';
import { LevelEntityCollection } from '@/modules/levels/model/common/types';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';

const getLevelCollection = new Selector<{}, LevelEntityCollection>().create((_, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().getCollection();
});

const getLevelById = new Selector<LevelByIdArgs, LevelEntity>().create((request, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().getById(request.id);
})

const getLevelMap = new Selector().create((_, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().getEntities();
})

export const levelSelectors = {
  getLevelCollection,
  getLevelById,
  getLevelMap,
}