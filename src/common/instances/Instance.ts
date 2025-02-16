import { Container } from "@common/utils/di/DIContainer";

export class Instance {
  public static add<T>(key: symbol): T {
    return Container.resolve(key);
  }
}