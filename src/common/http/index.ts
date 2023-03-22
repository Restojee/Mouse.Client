import {MiddlewareBuilder, Middleware} from "./types";
import {FetchBuilder} from "./FetchBuilder";
import {CreateMiddlewareBuilder} from "./CreateMiddlewareBuilder";
import {DefaultMiddlewares} from "./middlewares/DefaultMiddlewares";

export const createApiInstance = (payload: {
    middlewares: (middlewareBuilder: MiddlewareBuilder) => Array<Middleware>,
    url: string
}) => {
    const middlewares = payload.middlewares(
        CreateMiddlewareBuilder()
            .add(DefaultMiddlewares.AccessTokenPolicy)
            .add(DefaultMiddlewares.ErrorHandlerPolicy)
            .add(DefaultMiddlewares.NoAuthorizationPolicy)
            .add(DefaultMiddlewares.ResponseHandlerPolicy)
    );
    const config = { middlewares, url: payload.url }

    return FetchBuilder(config);
}