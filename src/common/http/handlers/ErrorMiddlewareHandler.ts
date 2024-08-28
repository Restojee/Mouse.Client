import { Middleware } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorMiddlewareHandler = <E>(error: E, payload: Array<Middleware>): void => {
  // прогоняем цепочку ошибок payload.forEach
  // передавая по ней response
};
