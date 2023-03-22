import { Middleware } from "./types";

export const CreateMiddlewareBuilder = () => {
    let middlewares: Array<Middleware> = [];
    const middlewareBuilder = {
        add: (payload: Middleware) => {
            middlewares.push(payload);
            return middlewareBuilder;
        },
        getMiddlewares: () => middlewares
    }
    return middlewareBuilder;
}