import "reflect-metadata";

export function Inject(token: symbol) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    console.log(`Injecting dependency for: ${target.constructor.name}, param index: ${parameterIndex}`);
    const existingTokens: symbol[] = Reflect.getOwnMetadata("inject:tokens", target) || [];
    existingTokens[parameterIndex] = token;
    Reflect.defineMetadata("inject:tokens", existingTokens, target);
  };
}