import "reflect-metadata";
import { Constructor } from "@common/utils/di/types";

export class Container {
  private static instances: Map<symbol, any> = new Map();
  private static bindings: Map<symbol, Constructor> = new Map();

  public static register<T>(token: symbol, constructor: Constructor<T>): void {
    this.bindings.set(token, constructor);
  }

  public static resolve<T>(token: symbol): T {
    if (!this.instances.has(token)) {
      const constructor = this.bindings.get(token);
      if (!constructor) {
        throw new Error(`No registration found for ${String(token)}`);
      }

      const paramTypes = Reflect.getMetadata("design:paramtypes", constructor) || [];
      console.info(`Param types for ${constructor.name}:`, paramTypes);

      // Читаем именованные токены из @Inject
      const injectTokens: symbol[] = Reflect.getMetadata("inject:tokens", constructor) || [];
      console.info(`Token names for ${constructor.name}:`, injectTokens);

      // Разрешаем зависимости
      const dependencies = paramTypes.map((paramType: any, index: number) => {
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