export const AccessTokenPolicy = {
  key: "AccessTokenPolicy",
  callback: () => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      request: (request: RequestInit) => {
        return {
          headers: { Authorization: `Bearer 123` },
        };
      },
    };
  },
};
