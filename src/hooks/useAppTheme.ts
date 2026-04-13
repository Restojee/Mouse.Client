import { selectAppTheme, setCurrentTheme } from "@/bll/appReducer";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GlobalThemes } from "@/layout/theme/constants";
import { GlobalTheme, ThemeKey } from "@/layout/theme/types";
import { useCallback, useMemo } from "react";

export const useAppTheme = (customThemeKey?: ThemeKey) => {
  const dispatch = useAppDispatch();

  const { getValue, setValue } = useLocalStorage<ThemeKey>(LOCAL_STORAGE_KEYS.APP_THEME);

  const appThemeKey = useAppSelector(selectAppTheme);

  const theme: GlobalTheme = useMemo(() => {
    if (customThemeKey) {
      return GlobalThemes[customThemeKey];
    }
    return appThemeKey ? GlobalThemes[appThemeKey] : GlobalThemes["LIGHT"];
  }, [customThemeKey, appThemeKey]);

  const localStorageTheme = useMemo(() => {
    return getValue();
  }, [getValue]);

  const onChangeTheme = useCallback(
    (theme: ThemeKey) => {
      setValue(theme);
      dispatch(setCurrentTheme(theme));
    },
    [dispatch, setValue],
  );

  const toggleTheme = useCallback(() => {
    if (appThemeKey === ThemeKey.DARK) {
      onChangeTheme(ThemeKey.LIGHT);
    } else {
      onChangeTheme(ThemeKey.DARK);
    }
  }, [onChangeTheme, appThemeKey]);

  const fetchTheme = useCallback(() => {
    const localStorageTheme = getValue();
    const defaultTheme = appThemeKey || ThemeKey.LIGHT;

    if (localStorageTheme) {
      dispatch(setCurrentTheme(localStorageTheme));
    } else {
      dispatch(setCurrentTheme(defaultTheme));
      setValue(defaultTheme);
    }
  }, [dispatch, getValue, setValue, appThemeKey]);

  return {
    theme,
    themeKey: appThemeKey,
    onChangeTheme,
    toggleTheme,
    fetchTheme,
    localStorageTheme,
  };
};
