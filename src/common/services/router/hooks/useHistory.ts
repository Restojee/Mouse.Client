import React from "react";
import { UrlBuilder } from "@common/services/router";
import { HistoryState } from "@common/services/router/common/types";

const useHistory = () => {

  const getCurrentState = (): HistoryState => {
    const url = new URL(window.location.href);
    const { pathname, search, searchParams } = url;
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return {
      pathname,
      search,
      params,
    };
  };

  const [location, setLocation] = React.useState<HistoryState>(getCurrentState());

  const push = React.useCallback((url: UrlBuilder) => {
    const href = url.toString();
    window.history.pushState({}, '', href);
    setLocation(getCurrentState());
  }, []);

  const replace = React.useCallback((url: UrlBuilder) => {
    const href = url.toString();
    window.history.replaceState({}, '', href);
    setLocation(getCurrentState());
  }, []);

  React.useEffect(() => {
    const onPopState = () => {
      setLocation(getCurrentState());
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return {
    location,
    push,
    replace,
  };
};

export default useHistory;
