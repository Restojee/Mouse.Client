import { Middleware } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ResponseMiddlewareHandler = async <R>(response: Response, payload: Array<Middleware>) => {
  // погоняем цепочку ответов payload.forEach
  // передавая по ней response
  return (await response.json()) as R;
};
