import { User } from "@/api/codegen/genMouseMapsApi";

const getStatistic = (user: User) => {
  return user.completedCount! + user.levelsCount!;
};

export const getStarsByUserId = (userId: User["id"], users: User[] = []) => {
  const sortedItems = [...users].sort((a, b) => getStatistic(b) - getStatistic(a));
  sortedItems.length = 5;
  const index = sortedItems.reverse().findIndex((item) => item.id === userId);

  return index !== -1 ? index + 1 : -1;
};
