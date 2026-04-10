import { selectAppTheme, setCurrentTheme } from "@/bll/appReducer";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GlobalThemes } from "@/layout/theme/constants";
import { GlobalTheme, ThemeKey } from "@/layout/theme/types";
import { useCallback, useMemo } from "react";

export const useAppTheme = () => {
  const dispatch = useAppDispatch();

  const { getValue, setValue } = useLocalStorage<ThemeKey>(LOCAL_STORAGE_KEYS.APP_THEME);

  const themeKey = useAppSelector(selectAppTheme);

  const theme: GlobalTheme = useMemo(() => (themeKey ? GlobalThemes[themeKey] : GlobalThemes["LIGHT"]), [themeKey]);

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
    if (themeKey === ThemeKey.DARK) {
      onChangeTheme(ThemeKey.LIGHT);
    } else {
      onChangeTheme(ThemeKey.DARK);
    }
  }, [onChangeTheme, themeKey]);

  const fetchTheme = useCallback(() => {
    const localStorageTheme = getValue();
    const defaultTheme = themeKey || ThemeKey.LIGHT;

    if (localStorageTheme) {
      dispatch(setCurrentTheme(localStorageTheme));
    } else {
      dispatch(setCurrentTheme(defaultTheme));
      setValue(defaultTheme);
    }
  }, [dispatch, getValue, setValue, themeKey]);

  return {
    theme,
    themeKey: themeKey,
    onChangeTheme,
    toggleTheme,
    fetchTheme,
    localStorageTheme,
  };
};
