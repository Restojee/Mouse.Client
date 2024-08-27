import { selectAppTheme, setCurrentTheme } from "@/bll/appReducer";
import { localStorageKeys } from "@/common/constants";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GlobalTheme, ThemeKey } from "@/layout/theme/types";
import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";

export const useAppTheme = () => {
  const dispatch = useAppDispatch();

  const { getValue, setValue } = useLocalStorage<ThemeKey>(localStorageKeys.APP_THEME);

  const theme = useTheme();

  const themeKey = useAppSelector(selectAppTheme);

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
    theme: theme as GlobalTheme,
    themeKey: themeKey,
    onChangeTheme,
    toggleTheme,
    fetchTheme,
    localStorageTheme,
  };
};
