import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";

export const GlobalThemeStyles = createGlobalStyle((theme: typeof DefaultTheme) => ({
  "::-webkit-scrollbar-button": {
    backgroundRepeat: "no-repeat",
    width: 6,
    height: 0,
  },

  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },

  "::-webkit-scrollbar-thumb": {
    "-webkit-border-radius": 10,
    borderRadius: 10,
    backgroundColor: "rgba(95, 95, 95, 0.5)",
    zIndex: 100,
  },

  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#7b7b7b",
  },

  "::-webkit-resizer": {
    "background-repeat": "no-repeat",
    width: 0,
    height: 0,
  },

  "::-webkit-scrollbar": {
    width: 8,
    height: 8,
  },

  "::selection": {
    background: `${theme.colors.selection}`,
  },

  "::-moz-selection": {
    background: `${theme.colors.selection}`,
  },

  "*": {
    padding: 0,
    margin: 0,
    scrollbarWidth: "thin",
    boxSizing: "border-box",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "inherit",
  },

  body: {
    color: `${theme.colors.textOnSecondary}`,
    fontSize: `${theme.font.fontSize}`,
  },

  button: {
    border: "none",
    outline: "none",
  },

  "img, svg": {
    userSelect: "none",
    "-moz-user-select": "none",
  },

  "input:-internal-autofill-selected": {
    backgroundColor: "transparent !important",
  },
}));
