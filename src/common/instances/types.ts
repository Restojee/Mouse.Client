import { Constructor } from "@common/utils/di/types";

export type GetInstance = <T>(key: string) => T

export type Provider = {
  key: string;
  provide: Constructor;
  useFactory?: () => any;
}
