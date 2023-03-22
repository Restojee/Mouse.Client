import {NoAuthorizationPolicy} from "./NoAuthorizationPolicy";
import {ErrorHandlerPolicy} from "./ErrorHandlerPolicy";
import {AccessTokenPolicy} from "./AccessTokenPolicy";
import {ResponseHandlerPolicy} from "./ResponseHandlerPolicy";

export const DefaultMiddlewares = {
    AccessTokenPolicy,
    ErrorHandlerPolicy,
    NoAuthorizationPolicy,
    ResponseHandlerPolicy
} as const;