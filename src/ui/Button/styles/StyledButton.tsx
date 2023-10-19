import styled from "styled-components";
import { Property } from "csstype";

export type StyledButtonProps = {
    justify?: Property.JustifyContent;
    borderRadius?: Property.BorderRadius;
    fontSize?: Property.FontSize;
    width?: Property.Width;
    bgColor?: Property.BackgroundColor;
    margin?: string | number;
    size?: 'sm' | 'md' | 'lg';
    isWithError?: boolean;
    disabled?: boolean;
    isBold?: boolean;
}
export const StyledButton = styled.button<StyledButtonProps>(({
    theme,
    isBold,
    justify = "center",
    bgColor = theme.colors.brandColor,
    size = "md",
    borderRadius = "20px",
    width = "min-content",
    margin = "",
    disabled
}) => ({
    justifyContent: justify,
    width: width,
    margin: margin,
    fontWeight: isBold ? 600 : 200,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    border: "none",
    whiteSpace: "nowrap",
    textAlign: "center",
    transition: "0.2s",
    cursor: "pointer",
    gap: 10,
    columnGap: 10,
    backgroundColor: bgColor,
    rowGap: 10,
    borderRadius: borderRadius,
    padding: "7px 10px",
    "&:hover": {
        transform: 'scale(0.98)'
    },
    ...disabled && {
        pointerEvents: 'none',
        opacity: 0.6
    },
    ...size
        ? theme.sizes.button[size]
        : theme.sizes.button.md,
}))