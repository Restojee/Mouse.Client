import { useAppTheme } from "@/hooks/useAppTheme";
import dynamic from "next/dynamic";
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { GlobalThemeStyles } from "@/layout/theme/GlobalThemeStyles";
import { GlobalThemes } from "@/layout/theme/constants";

enum MediaKey {
  XS = "XS",
  SM = "SM",
  MD = "MD",
  LG = "LG",
  XL = "XL"
}

type Props = {
  children: React.ReactNode;
}
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
      <Fragment>
        {props.children}
      </Fragment>
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
