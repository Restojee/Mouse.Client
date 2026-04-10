import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useEffect } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import { ThemeKey } from "@/layout/theme/types";

type Props = {
  children: React.ReactNode;
};
const ThemeProvider = ({ children }: Partial<Props>) => {
  const { themeKey = ThemeKey.LIGHT, theme, fetchTheme, localStorageTheme } = useAppTheme();

  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeKey);
  }, [themeKey]);

  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
};

export default ThemeProvider;
