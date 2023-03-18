import styled from "styled-components";
import { Property } from "csstype";

type Props = {
    textAlign?: Property.TextAlign,
    fontWeight?: Property.FontWeight,
    addSize?: Property.FontSize;
    size?: Property.FontSize;
    opacity?: Property.Opacity;
    margin?: Property.Margin;
    fontSize?: number | string;
    isEllipsis?: boolean;
    isUpperCase?: boolean;
    isLink?: boolean;
    isClickable?: boolean;
    isUnselectable?: boolean;
}
export const Typography = styled.p<Props>(props => ({
    textAlign: props.textAlign,
    wordWrap: "break-word",
    opacity: props.opacity,
    fontWeight: props.fontWeight,
    margin: props.margin,
    fontSize: props.fontSize,
    ...props.isUpperCase && {
        textTransform: "uppercase",
    },
    ...props.isUnselectable && {
        userSelect: "none"
    },
    color: props.color,
    ...props.isEllipsis && {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    ...props.isLink && {
        textDecoration: "underline",
        color: props.theme.colors.brandColor,
        fontWeight: "bold",
        cursor: "pointer",
        "&:hover":{
            opacity: 0.8
        }
    },
    ...props.isClickable && {
        opacity: 0.5,
        fontSize: 12,
        cursor: "pointer",
        "&:hover":{
            opacity: 0.7
        }
    }
}))