import { createGlobalStyle } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";

export const GlobalThemeStyles = createGlobalStyle((theme: typeof DefaultTheme) => ({
  "::-webkit-scrollbar": {
    width: 6,
    height: 6,
  },

  "::-webkit-scrollbar-button": {
    display: "none",
    width: 0,
    height: 0,
  },

  "::-webkit-scrollbar-track": {
    background: "none",
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: 10,
    backgroundColor: "rgba(95, 95, 95, 0.4)",
  },

  "::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(95, 95, 95, 0.7)",
  },

  "::-webkit-resizer": {
    display: "none",
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
    scrollbarColor: "rgba(95, 95, 95, 0.4) transparent",
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
