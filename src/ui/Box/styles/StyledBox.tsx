import styled from "styled-components";
import { Property } from "csstype";
import { ReactNode } from "react";

export type StyledBoxProps = {
    direction: Property.FlexDirection;
    align: Property.AlignItems;
    borderRadius: Property.BorderRadius<number>;
    justify: Property.JustifyContent;
    position: Property.Position;
    gap: Property.RowGap<number>;
    margin: Property.Margin<number>;
    padding: Property.Padding<number>;
    bgColor: Property.BackgroundColor;
    border: Property.Border;
    maxWidth: Property.MaxWidth<number>;
    minWidth: Property.MinWidth<number>;
    minHeight: Property.MinHeight<number>;
    color: Property.Color;
    width: Property.Width<number>;
    height: Property.Height<number>;
    opacity: Property.Opacity;
    overflow: Property.Overflow;
    wrap: Property.FlexWrap;
    transform: Property.Transform;
    transition: Property.Transition;
    grow: Property.FlexGrow;
    cursor: Property.Cursor;
    textAlign: Property.TextAlign;
    fontSize: Property.FontSize;
    fontWeight: Property.FontWeight;
    boxShadow: Property.BoxShadow;
    zIndex: Property.ZIndex;
    borderBottom: Property.BorderBottom;
    maxHeight: Property.MaxHeight;

    isClickable: boolean;
    isActive: boolean;
    bgColorByActive: string;
    stylized: boolean;

    children: ReactNode | JSX.Element;
}
export const StyledBox = styled.div<Partial<StyledBoxProps>>(({ theme, ...props }) => ({
    display: "flex",
    flexDirection: props.direction || "row",
    alignItems: props.align,
    boxShadow: props.boxShadow,
    justifyContent: props.justify,
    gap: props.gap,
    rowGap: props.gap,
    margin: props.margin,
    padding: props.padding,
    backgroundColor: props.bgColor,
    border: props.border,
    textAlign: props.textAlign,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    color: props.color,
    borderRadius: props.borderRadius,
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
    minHeight: props.minHeight,
    minWidth: props.minWidth,
    width: props.width,
    height: props.height,
    opacity: props.opacity,
    position: props.position,
    overflow: props.overflow,
    flexGrow: props.grow,
    flexWrap: props.wrap,
    borderBottom: props.borderBottom,
    columnGap: props.gap,
    transform: props.transform,
    transition: props.transition,
    cursor: props.cursor,
    ...props.stylized && {
        padding: 15,
        borderRadius: 10,
        backgroundColor: props.bgColor || theme.colors.primary,
        "&:hover": {
            backgroundColor: props.bgColorByActive || theme.colors.primaryLight,
        },
    },

}))