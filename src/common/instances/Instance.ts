import { Container } from "@common/utils/di/Container";
import { InstanceKey } from "@common/utils/di/types";

export class Instance {
  public static add<T>(key: InstanceKey): T {
    return Container.resolve(key);
  }
  public static remove(key: InstanceKey): void {
    return Container.destroy(key);
  }
  public static get<T>(key: InstanceKey): T {
    return Container.get(key);
  }
}