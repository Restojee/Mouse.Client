export const AccessTokenPolicy = {
    key: "AccessTokenPolicy",
    callback: () => {
        return {
            request: (request: RequestInit) => {
                return {
                    headers: { Authorization: `Bearer 123` }
                }
            }
        }
    }
}