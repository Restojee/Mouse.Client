import { InstanceKey, LifecycleType } from "@common/utils/di/types";
import { Container } from "@common/utils/di/Container";

export function Register(token: InstanceKey, lifecycle: LifecycleType = LifecycleType.Transient) {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log(`Registering class: ${constructor.name}`);
    Container.register(token, constructor);
  }
}