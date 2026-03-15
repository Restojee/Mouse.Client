import * as queryString from "querystring";
import { ErrorMiddlewareHandler } from "./handlers/ErrorMiddlewareHandler";
import { RequestMiddlewareHandler } from "./handlers/RequestMiddlewareHandler";
import { ResponseMiddlewareHandler } from "./handlers/ResponseMiddlewareHandler";
import { FR, Middleware } from "./types";

const getPattern = (payload: string) => `{${payload}}`;

const parseUrlPattern = <T extends { [key: string]: never }>(payload: T, url: string) => {
  let parsedUrl = url;
  const params = payload;

  Object.entries(params).forEach(([payloadKey, payloadValue]) => {
    const urlPattern = getPattern(payloadKey);
    if (url.includes(urlPattern)) {
      parsedUrl = url.replace(urlPattern, payloadValue);
      delete params[payloadKey];
    }
  });

  const queryParams = queryString.stringify(params);

  if (Object.keys(params).length > 0) {
    return parsedUrl + `?${queryParams}`;
  }

  return parsedUrl;
};

//buildRequestConfig(payload)

// Создаем RequestInit
const prepareRequestInit = <T extends NonNullable<unknown>>(
  payload: T,
  url: string,
  requestInit: RequestInit,
): RequestInit => {
  return requestInit;
};

export const FetchBuilder = (instanceOptions: { middlewares: Array<Middleware>; url: string }) => {
  // Дописываем RequestInit из миддлвари
  const requestOptions: RequestInit = {};
  const config = RequestMiddlewareHandler(requestOptions, instanceOptions.middlewares);

  return <T extends NonNullable<unknown>, R>(httpCaller: FR<T>) => {
    return (payload: T) => {
      console.log("method payload:", payload);

      const options = httpCaller(payload);
      const parsedUrl = parseUrlPattern(payload, options.url);
      const preparedRequest = prepareRequestInit(options, parsedUrl, config);

      console.log("parsedUrl:", parsedUrl);
      console.log("preparedRequest:", preparedRequest);

      console.log(options);

      return fetch(instanceOptions.url + parsedUrl, preparedRequest)
        .then((response) => ResponseMiddlewareHandler<R>(response, instanceOptions.middlewares))
        .catch((error) => ErrorMiddlewareHandler(error, instanceOptions.middlewares));
    };
  };
};
