import styled from "styled-components";
import { Property } from "csstype";

type Props = {
    textAlign?: Property.TextAlign,
    fontWeight?: Property.FontWeight,
    size?: Property.FontSize<number>;
    opacity?: Property.Opacity;
    margin?: Property.Margin<number>;
    fontSize?: Property.FontSize<number>;
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
        color: props.theme.colors.brandColor,
        cursor: "pointer",
        "&:hover":{
            textDecoration: "underline",
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