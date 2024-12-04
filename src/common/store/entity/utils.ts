export const Field =(key: string) => {
  return (target: any, propertyKey: string) => {
    // Создаем объект fieldKeys, если его нет
    if (!target.fieldKeys) {
      target.fieldKeys = {};
    }
    // Сохраняем соответствие: свойство -> ключ
    target.fieldKeys[propertyKey] = key;
  };
}