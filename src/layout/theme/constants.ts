import { ThemeKey } from "@/layout/theme/types";

export const DefaultTheme = {
    colors: {
        brandColor: '#e96b6b',
        selection: '#e96b6b',

        primaryDark: '#3d3d3d',
        primary: '#2b2b2b',
        primaryLight: '#2b2b2bf4',
        primaryLighter: '#3d3d3d',
        textOnPrimary: '#fff',

        secondary: '#fff',
        secondaryDark: '#F6F6F6',
        textOnSecondary: '#000',
        iconOnSecondary: '#939393',

        neutral: '#F3F2F5',

        mapBackground: '#6b7494',

        status: {
            success: '#7fd482',
            danger: '#ff8935',
            info: '#6b88e9',
            error: '#ff3548',
        },

        input: {
            border: 'rgba(0, 0, 0, 0.1)',
            default: '#fff',
            hover: '#f5f5f5',
            focus: 'red',
        },
    },

    font: {
        fontSize: '14px',
        logoFont: "'Stick', sans-serif",

        sizes: {
            default: "14px",
            h1: "20px",
            h2: "18px",
            h3: "16px",
        }
    },

    blockSettings: {
        siteBorder: '20px',
    },

    sizes: {
        leftSidebar: { width: '300px' },
        rightSidebar: { width: '380px' },
        sitePanel: { width: '50px' },
        modal: { width: '540px' },
        media: {
            extraLarge: 1140,
            large: 960,
            medium: 600,
            small: 540,
        },
        input: {
            default: {
                padding: '7px 15px',
                fontSize: 'inherit',
            },
            lg: {
                padding: '13px 20px',
                fontSize: 'inherit',
            },
        },
        button: {
            sm: {
                padding: '6px 10px',
                fontSize: '10px',
                svg: { width: '12px', height: '12px' },
            },
            md: {
                padding: '7px 12px',
                fontSize: '14px',
                svg: { width: '14px', height: '14px' },
            },
        },
    },

    order: {
        other: 1,
        leftSidebar: 5,
        rightSidebar: 5,
        megaShadow: 10,
        modal: 10,
        dropdown: 5,
    },
}

export const GlobalThemes = {
    [ThemeKey.DARK]: DefaultTheme,
    [ThemeKey.LIGHT]: DefaultTheme
}