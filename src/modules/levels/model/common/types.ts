import LevelEntity from '@/modules/levels/model/common/LevelEntity';
import User from "@/modules/users/User";

export type LevelEntityCollection = Array<LevelEntity>;
export type LevelMapById = Map<string, LevelEntity>;
export interface LevelFields {
  name: string;
  description: string;
  user?: User;
}