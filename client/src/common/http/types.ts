export type RequestBuilderPayload<T> = {
  params?: Partial<T>;
  body?: Partial<T>;
  url: string;
  method: string;
};

export type Middleware = {
  key: string;
  callback: <Response = unknown, Error = unknown>() => {
    error?: (error: Error) => void;
    response?: (response: Response) => void;
    request?: (request: RequestInit) => RequestInit;
  };
};

export type MiddlewareBuilder = {
  add: (payload: Middleware) => MiddlewareBuilder;
  getMiddlewares: () => Array<Middleware>;
};

export type FetchRequest<T> = (payload: T) => RequestBuilderPayload<T>;

export type FR<T> = FetchRequest<T>;
