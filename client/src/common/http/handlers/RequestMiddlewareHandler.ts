import { Middleware } from "../types";

export const RequestMiddlewareHandler = (request: RequestInit, payload: Array<Middleware>): RequestInit => {
  // прогоняем цепочку сборки запросов payload.forEach
  // передавая по ней request

  let requestInit: RequestInit = {};

  for (const middlewareCaller of payload) {
    const middleware = middlewareCaller.callback();
    if (middleware.request) {
      requestInit = middleware.request(requestInit);
    }
  }

  console.log("prepared request:", requestInit);

  return requestInit;
};
