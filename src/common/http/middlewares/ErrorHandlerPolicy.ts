import {Middleware} from "../types";

export const ErrorHandlerPolicy = {
    key: "ErrorHandlerPolicy",
    callback: <Error>() => {
        return {
            error: (error: Error) => {

            }
        }
    }
}