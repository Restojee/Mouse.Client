import LevelStore from '@/modules/levels/model/store/store';
import Selector from '@common/store/selector/Selector';
import { LevelByIdArgsType } from '@/modules/levels/common/api/types';
import { LevelEntityCollection } from '@/modules/levels/model/common/types';
import LevelEntity from '@/modules/levels/model/common/LevelEntity';

const getLevelCollection = new Selector<{}, LevelEntityCollection>().create((_, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().collect();
});

const getLevelById = new Selector<LevelByIdArgsType, LevelEntity>().create((request, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().get(request.id);
})

const getLevelMap = new Selector().create((_, options) => {
  const { getInstance } = options;
  const { getLevelEntityManager } = getInstance<LevelStore>(LevelStore.GlobalInjectKey);
  return getLevelEntityManager().entities();
})

export const levelSelectors = {
  getLevelCollection,
  getLevelById,
  getLevelMap,
}