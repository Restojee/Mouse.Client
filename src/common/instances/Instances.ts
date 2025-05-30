import { Constructor, InstanceKey } from "@common/utils/di/types";
import { BindingScope, Container as DIContainer } from "inversify";
import { Provider } from "@common/instances/types";

type InstanceType = InstanceKey | Constructor;

export class Instances {

  private readonly Container = new DIContainer();

  /**
   * Метод для привязки провайдеров (фабрик или классов) к контейнеру.
   * Для каждого провайдера проверяется, если он использует фабрику (useFactory),
   * то создается привязка через фабрику, иначе — через обычный класс.
   *
   * @param providers - Массив провайдеров, которые нужно добавить в контейнер.
   * Каждый провайдер может быть классом или фабрикой.
   * @param scope
   */
  public bind(providers: Provider[], scope?: BindingScope): void {
    providers.forEach(service => {
      if (service.provide && service.useFactory) {
        this.addWithFactory(service.key, service.useFactory);
      } else {
        this.add(service.key, service.provide, scope);
      }
    });
  }

  /**
   * Метод для добавления обычной привязки в контейнер.
   * Используется для привязки классов.
   *
   * @param key - Ключ (или тип) для привязки.
   * @param constructor - Класс, который будет привязан.
   * @param scope - Область видимости
   */
  public add(key: InstanceType, constructor: Constructor, scope?: BindingScope): void {
    const instance = this.Container.bind(key).to(constructor);
    switch (scope) {
      case "Request": {
        instance.inRequestScope();
        break;
      }
      case "Transient": {
        instance.inTransientScope();
        break;
      }
      case "Singleton": {
        instance.inSingletonScope();
        break;
      }
    }
  }

  /**
   * Метод для получения экземпляра из контейнера.
   * Позволяет извлечь объект по ключу или типу.
   *
   * @param key - Ключ (или тип), по которому извлекается экземпляр.
   * @returns - Возвращает экземпляр, который был привязан с данным ключом.
   */
  public get<Instance>(key: InstanceType): Instance {
    return this.Container.get<Instance>(key);
  }

  /**
   * Метод для удаления привязки из контейнера.
   *
   * @param key - Ключ или тип, по которому необходимо удалить привязку.
   */
  public remove(key: InstanceKey): void {
    this.Container.unbind(key);
  }

  /**
   * Метод для привязки фабрики (функции) к контейнеру.
   * Используется для создания объектов с помощью фабрик.
   * Привязка выполняется в скоупе (singleton, transient и т.д.).
   *
   * @param key - Ключ, по которому будет привязана фабрика.
   * @param factory - Фабрика (функция), которая создает экземпляры.
   */
  public addWithFactory<T>(key: InstanceType, factory: () => T): void {
    this.Container
      .bind(key)
      .toDynamicValue(factory)
      .inSingletonScope();
  }
}
