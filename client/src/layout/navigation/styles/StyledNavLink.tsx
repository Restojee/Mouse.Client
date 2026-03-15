import { Property } from "csstype";
import styled from "styled-components";

type Props = {
  margin?: Property.Margin;
  justifyContent?: Property.JustifyContent;
  gap?: Property.Gap;
  isOpen?: boolean;
  withBorder?: boolean;
  isDisabled?: boolean;
  isChecked?: boolean;
  hasPin?: boolean;
};
export const StyledNavLink = styled.div<Props>(
  ({ theme, margin, isOpen, withBorder, hasPin, isDisabled, gap, isChecked, justifyContent }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px",
    borderRadius: "10px",
    position: "relative",
    whiteSpace: "nowrap",
    gap: gap,
    border: "1px solid transparent",
    margin: margin,
    justifyContent: justifyContent,
    transitionProperty: "background-color",
    transition: "0.5s",

    svg: {
      transition: "0.2s",
    },
    ...(withBorder && {
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: -5,
        right: 5,
        left: 5,
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    }),
    ...(isDisabled && {
      opacity: 0.3,
      "*": {
        cursor: "default",
      },
    }),
    ...(hasPin && {
      "&:before": {
        content: '""',
        position: "absolute",
        top: 6,
        right: 6,
        height: 6,
        width: 6,
        borderRadius: 50,
        backgroundColor: theme.colors.brandColor,
        zIndex: 1,
      },
    }),
    ...(!isDisabled && {
      cursor: "pointer",
      ...(isChecked && {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }),
      "&:hover": {
        backgroundColor: isOpen ? `rgba(255, 255, 255, 0.05)` : `rgba(255, 255, 255, 0.1)`,
        svg: {
          transform: "scale(0.85)",
        },
      },
    }),
  }),
);
