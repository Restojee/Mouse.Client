import { ThemeColorKey } from '@common/themes/common/types';

/**
 * Преобразует токен темы в CSS-переменную
 *
 * @param token Токен темы (например, 'paletteTextPrimary', 'borderThinNormal', 'shadowSm')
 * @param strict
 * @returns CSS-переменная в формате var(--tokenName) или исходное значение если это не токен
 */
export const toVar = (token: string | undefined, strict = true): string => {
  if (!token) return '';
  
  // Если значение уже является CSS-переменной или CSS-значением, возвращаем как есть
  if (strict && (
    token.startsWith('var(') ||
    token.startsWith('#') ||
    token.startsWith('rgb') ||
    token.includes('px') ||
    token.includes('%')
  )) {
    return token;
  }

  // Для токенов темы преобразуем в CSS-переменную
  return `var(--${token})`;
};

/**
 * Получает CSS-класс для токена
 * 
 * @param token Токен темы
 * @returns Имя CSS-класса соответствующее токену
 */
export const getTokenClass = (token?: string): string | undefined => {
  if (!token) return undefined;
  return token;
};

/**
 * Создает массив CSS-классов из объекта с токенами
 * 
 * @param tokens Объект с токенами темы или CSS-классами
 * @returns Массив CSS-классов для использования в className
 */
export const createTokenClasses = (
  tokens: Record<string, string | undefined>
): string[] => {
  return Object.entries(tokens)
    .filter(([_, value]) => value !== undefined)
    .map(([_, value]) => value as string);
};

/**
 * Устанавливает CSS-свойство с учетом преобразования токенов в CSS-переменные
 * 
 * @param property CSS-свойство (например, 'color', 'background-color', 'border')
 * @param value Значение свойства (токен или CSS-значение)
 * @returns Объект со стилем в формате { [property]: value }
 */
export const setCssProperty = (
  property: string, 
  value?: string | ThemeColorKey
): Record<string, string | undefined> => {
  if (!value) return {};
  
  return { [property]: toVar(value) };
};

/**
 * Создает объект стилей из нескольких CSS-свойств с учетом преобразования токенов
 * 
 * @param styles Объект с CSS-свойствами и их значениями
 * @returns Объект стилей с преобразованными значениями
 */
export const createStyles = (
  styles: Record<string, string | ThemeColorKey | undefined>
): Record<string, string | undefined> => {
  return Object.entries(styles).reduce((result, [property, value]) => {
    if (!value) return result;
    return { ...result, ...setCssProperty(property, value) };
  }, {});
}; 
