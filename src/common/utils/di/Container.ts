import "reflect-metadata";
import { Constructor, InstanceKey } from "@common/utils/di/types";

export class Container {
  private static instances: Map<InstanceKey, any> = new Map();
  private static bindings: Map<InstanceKey, Constructor> = new Map();

  public static register<T>(token: InstanceKey, constructor: Constructor<T>): void {
    this.bindings.set(token, constructor);
  }

  public static destroy(token: InstanceKey): void {
    this.instances.get(token).dispose();
    this.instances.delete(token);
    this.bindings.delete(token);
  }

  public static get<T>(token: InstanceKey): T {
    return this.instances.get(token);
  }

  public static resolve<T>(token: InstanceKey): T {
    if (!this.instances.has(token)) {

      console.info(`Resolve constructor ${token}`);
      console.log(this.bindings)
      const constructor = this.bindings.get(token);
      if (!constructor) {
        throw new Error(`No registration found for ${token}`);
      }

      const paramTypes = Reflect.getMetadata("design:paramtypes", constructor) || [];
      console.info(`Param types for ${constructor.name}:`, paramTypes);

      // Читаем именованные токены из @Inject
      const injectTokens: InstanceKey[] = Reflect.getMetadata("inject:tokens", constructor) || [];
      console.info(`Token names for ${constructor.name}:`, injectTokens);

      // Разрешаем зависимости
      const dependencies = paramTypes.map((paramType: string, index: number) => {
        const token = injectTokens[index] || paramType;
        if (this.bindings.has(token)) {
          return this.resolve(token);
        }
        throw new Error(`No registration found for parameter ${index} in ${constructor.name}`);
      });

      const instance = new constructor(...dependencies);
      this.instances.set(token, instance);
    }

    return this.instances.get(token);
  }
}