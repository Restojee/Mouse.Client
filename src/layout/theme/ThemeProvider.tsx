import { useAppTheme } from "@/hooks/useAppTheme";
import React, { useEffect } from "react";
import { ThemeKey } from "@/layout/theme/types";

type Props = {
  children: React.ReactNode;
};
const ThemeProvider = ({ children }: Partial<Props>) => {
  const { themeKey = ThemeKey.LIGHT, fetchTheme } = useAppTheme();

  useEffect(() => {
    fetchTheme();
  }, []);

  useEffect(() => {
    if (themeKey) document.documentElement.setAttribute("data-theme", themeKey);
  }, [themeKey]);

  return <>{children}</>;
};

export default ThemeProvider;
