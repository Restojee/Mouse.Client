import { GlobalTheme, ThemeKey } from "@/layout/theme/types";

export const DefaultTheme = {
  colors: {
    brandColor: "#e96b6b",
    brandColorContrastText: "#ffffff",
    selection: "#e96b6b",

    primaryDark: "#3d3d3d",
    primary: "#2b2b2b",
    primaryLight: "#383838",
    primaryLighter: "#3d3d3d",
    primaryAccent: "rgba(255,255,255,0.08)",
    textOnPrimary: "#fff",

    secondary: "#fff",
    secondaryDarker: "#eaeaea",
    secondaryDark: "#f8f8f8",
    secondaryAccent: "rgba(0,0,0,0.28)",
    textOnSecondary: "#000",
    iconOnSecondary: "#939393",
    disabled: "#b9b9b9",

    neutral: "#F3F2F5",

    mapBackground: "#6b7494",
    mapBackgroundLight: "#a7acc7",
    backgroundShadow: "rgba(255, 255, 255, 0.4)",

    default: {
      paper: "#FFFFFF",
      paperAccent: "rgba(0, 0, 0, 0.07)",
    },

    status: {
      success: "#70c073",
      danger: "#ff8935",
      info: "#6b88e9",
      error: "#ce5252",
    },

    input: {
      border: "rgba(0, 0, 0, 0.1)",
      default: "#fff",
      hover: "#f5f5f5",
      focus: "red",
    },
  },

  font: {
    fontSize: "14px",
    logoFont: "'Stick', sans-serif",

    sizes: {
      default: "14px",
      h1: "20px",
      h2: "18px",
      h3: "16px",
    },
  },

  blockSettings: {
    siteBorder: "20px",
  },

  sizes: {
    leftSidebar: { width: "300px" },
    rightSidebar: { width: "380px" },
    sitePanel: { width: "50px" },
    modal: { width: "540px" },
    media: {
      extraLarge: 1140,
      large: 960,
      medium: 600,
      small: 540,
    },
    input: {
      default: {
        padding: "7px 15px",
        fontSize: "inherit",
      },
      lg: {
        padding: "13px 20px",
        fontSize: "inherit",
      },
    },
    button: {
      sm: {
        padding: "8px 15px",
        fontSize: "12px",
        svg: { width: "12px", height: "12px" },
      },
      md: {
        padding: "12px 25px",
        fontSize: "0.8rem",
        svg: { width: "14px", height: "14px" },
      },
      lg: {
        padding: "16px 32px",
        fontSize: "16px",
        svg: { width: "14px", height: "14px" },
      },
    },
  },

  order: {
    other: 1,
    popup: 3,
    leftSidebar: 5,
    rightSidebar: 5,
    megaShadow: 10,
    notifications: 15,
    modal: 11,
    dropdown: 5,
  },
};

const DarkTheme: GlobalTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#232323",
    secondary: "#2b2b2b",
    secondaryAccent: "#1c1c1c",
    textOnSecondary: "#eaeaea",
    textOnPrimary: "#eaeaea",
    disabled: "#727272",

    input: {
      default: "rgb(61,61,61)",
      hover: "rgb(68,68,68)",
      focus: "rgb(68,68,68)",
      border: "rgb(68,68,68)",
    },
    secondaryDark: "#262626",
    secondaryDarker: "#1e1e1e",
    iconOnSecondary: "rgb(82,82,82)",
    default: {
      paper: "#2b2b2b",
      paperAccent: "rgba(255,255,255,0.07)",
    },
    neutral: "rgba(255, 255, 255, 0.05)",
    backgroundShadow: "rgba(0, 0, 0, 0.4)",
  },
};

export const GlobalThemes = {
  [ThemeKey.DARK]: DarkTheme,
  [ThemeKey.LIGHT]: DefaultTheme,
};
