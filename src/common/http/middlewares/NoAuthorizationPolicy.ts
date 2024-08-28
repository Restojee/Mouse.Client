export const NoAuthorizationPolicy = {
  key: "NoAuthorizationPolicy",
  callback: <Error>() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error: (error: Error) => {},
    };
  },
};
