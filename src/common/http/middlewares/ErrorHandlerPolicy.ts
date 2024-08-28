export const ErrorHandlerPolicy = {
  key: "ErrorHandlerPolicy",
  callback: <Error>() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error: (error: Error) => {},
    };
  },
};
