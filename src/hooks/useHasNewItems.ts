import { useMemo } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";

export const useHasNewItems = (key: LOCAL_STORAGE_KEYS, currentCount?: number) => {
  const { getValue } = useLocalStorage<number>(key);

  return useMemo(() => {
    if (!currentCount) return false;

    const storedValue = getValue();

    // приводим к числу, если значение есть
    const storedCount = storedValue !== undefined && storedValue !== null ? Number(storedValue) : undefined;

    const isNotifications = key === LOCAL_STORAGE_KEYS.NOTIFICATIONS_COUNT;

    // 1. Специальное поведение для уведомлений:
    // если в localStorage ещё нет значения — считаем, что есть новые
    if (isNotifications && storedCount === undefined) {
      return true;
    }

    // 2. Если нечего сравнивать — не показываем
    if (currentCount === undefined || storedCount === undefined) {
      return false;
    }

    // 3. Основной кейс:
    // показываем, если количество изменилось
    return currentCount !== storedCount;
  }, [getValue, key, currentCount]);
};
