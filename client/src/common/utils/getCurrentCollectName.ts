import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";

export const getCurrentCollectName = (query: Partial<GetMapsApiArg>): string => {
  if (query.isCompleted === true) {
    return "Выполненные";
  } else if (query.isCompleted === false) {
    return "Невыполненные";
  } else if (query.isFavorite === true) {
    return "Избранные";
  } else if (query.isCreatedByUser === true) {
    return "Добавленные";
  } else if (query.isWithComment === true) {
    return "Прокомментированные";
  } else if (query.hasNote === true) {
    return "Карты с заметкой";
  } else {
    return "Все карты";
  }
};
