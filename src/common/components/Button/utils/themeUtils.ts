import { ThemeColorKey } from '@common/themes/common/types';

/**
 * Преобразует токен темы в CSS переменную или возвращает обычное CSS значение
 * @param value - токен темы или CSS значение
 * @returns CSS значение или CSS переменная
 */
export const resolveThemeValue = (value?: ThemeColorKey | string): string | undefined => {
  if (!value) return undefined;
  
  // Если значение уже является CSS переменной, возвращаем как есть
  if (value.startsWith('var(') || value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba')) {
    return value;
  }
  
  // Если значение начинается с palette, это токен темы
  if (value.startsWith('palette')) {
    // Преобразуем camelCase в CSS переменную
    // paletteBackgroundPrimary -> --paletteBackgroundPrimary
    return `var(--${value})`;
  }
  
  // Для других значений возвращаем как есть
  return value;
};

/**
 * Проверяет является ли значение токеном темы
 */
export const isThemeToken = (value?: string): boolean => {
  return typeof value === 'string' && value.startsWith('palette');
}; 