import { useAppTheme } from "@/hooks/useAppTheme";
import { GlobalThemes } from "@/layout/theme/constants";
import { GlobalThemeStyles } from "@/layout/theme/GlobalThemeStyles";
import React, { Fragment, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

type Props = {
  children: React.ReactNode;
};
const ThemeProvider = (props: Partial<Props>) => {
  const { themeKey, fetchTheme, localStorageTheme } = useAppTheme();
  const theme = themeKey ? GlobalThemes[themeKey] : GlobalThemes["LIGHT"];

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  if (!localStorageTheme) {
    return <div></div>;
  }

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalThemeStyles {...theme} />
      <Fragment>{props.children}</Fragment>
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
