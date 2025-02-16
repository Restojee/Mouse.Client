export function Inject(token: symbol) {
  return function (target: any, _: string | symbol, index: number) {
    Reflect.defineMetadata(`inject_param_${index}`, token, target);
  }
}