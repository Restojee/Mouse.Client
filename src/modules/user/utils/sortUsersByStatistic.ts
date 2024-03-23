import { User } from "@/api/codegen/genMouseMapsApi";

export const sortUsersByStatistic = (users: User[]) => {
  return users.sort((a, b) => {
    const completedAndLevelsA = (a.completedCount || 0) + (a.levelsCount || 0);
    const completedAndLevelsB = (b.completedCount || 0) + (b.levelsCount || 0);
    return completedAndLevelsB - completedAndLevelsA;
  });
}