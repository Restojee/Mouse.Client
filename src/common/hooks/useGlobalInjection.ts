import { GlobalInstances } from "@common/instances/GlobalInstances";

/**
 * Хук для получения зависимостей из глобального контейнера
 * 
 * @param identifier - Ключ или тип зависимости
 * @returns Экземпляр зависимости
 */
export const useGlobalInjection = <T>(identifier: any): T => {
  return GlobalInstances.get<T>(identifier);
}; 