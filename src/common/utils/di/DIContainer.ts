import "reflect-metadata";
import { Constructor, LifecycleType, RegistrationOptions } from "@common/utils/di/types";

export class DIContainer {
  private registrations = new Map<symbol, RegistrationOptions>();

  register<T>(token: symbol, constructor: Constructor<T>, lifecycle: LifecycleType = LifecycleType.Transient) {
    this.registrations.set(token, { constructor, lifecycle });
  }

  resolve<T>(token: symbol): T {
    const registration = this.registrations.get(token);

    if (!registration) {
      throw new Error(`No registration for token: ${token.toString()}`);
    }

    if (registration.lifecycle === LifecycleType.Singleton && registration.instance) {
      return registration.instance;
    }

    const constructorParams = Reflect.getMetadata("design:paramtypes", registration.constructor) || [];
    const dependencies = constructorParams.map((param: any) => this.resolve(param));
    const instance = new registration.constructor(...dependencies);

    if (registration.lifecycle === LifecycleType.Singleton) {
      registration.instance = instance;
    }

    return instance;
  }
}

export const container = new DIContainer();