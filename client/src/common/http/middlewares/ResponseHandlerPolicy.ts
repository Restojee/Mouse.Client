export const ResponseHandlerPolicy = {
  key: "ResponseHandlerPolicy",
  callback: <Response>() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      response: (response: Response) => {},
    };
  },
};
