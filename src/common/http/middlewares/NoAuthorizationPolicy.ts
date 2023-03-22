export const NoAuthorizationPolicy = {
    key: "NoAuthorizationPolicy",
    callback: <Error>() => {
        return {
            error: (error: Error) => {

            }
        }
    }
}