/**
 * Преобразует строку в camelCase, начиная с указанного регистра
 * @param str Исходная строка
 * @param startWithUpperCase Начинать с заглавной буквы (PascalCase) или строчной (camelCase)
 * @returns Строка в camelCase или PascalCase
 */
export const toCamelCase = (str: string, startWithUpperCase = false): string => {
  // Разбиваем строку на части по разделителям и приводим к нижнему регистру
  const parts = str.split(/[-_\s.]+/).map(s => s.toLowerCase());
  
  // Обработка первой части в зависимости от флага
  let result = startWithUpperCase 
    ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    : parts[0];
  
  // Добавляем остальные части с заглавной первой буквой
  for (let i = 1; i < parts.length; i++) {
    result += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
  }
  
  return result;
}; 