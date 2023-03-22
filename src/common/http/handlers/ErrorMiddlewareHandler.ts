import { Middleware } from "../types";

export const ErrorMiddlewareHandler = <E>(error: E, payload: Array<Middleware>): void => {
    // прогоняем цепочку ошибок payload.forEach
    // передавая по ней response
}