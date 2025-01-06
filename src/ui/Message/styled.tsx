import styled, { css, CSSObject, keyframes } from "styled-components";
import { StyledTextarea } from "@/ui/Textarea/styled";
import { Property } from "csstype";

const moveLeftRight = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const StyledMessageText = styled.div({
  wordBreak: "break-word",
  maxWidth: "100%",
  textAlign: "initial",
});

export const StyledMessageSendFormTextarea = styled(StyledTextarea)<{ bgColor?: Property.BackgroundColor }>(
  ({ theme, ...props }) => ({
    flexGrow: 1,
    borderRadius: theme.blockSettings.siteBorder,
    height: 54,
    minHeight: 54,
    overflow: "hidden",
    transition: "0.2s",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: props.bgColor || "",
    "&:focus": {
      height: 100,
      overflow: "auto",
    },
  }),
);

export const StyledMessageSendFormIcon = styled.div<{ isFetching: boolean; isDisabled: boolean }>(
  (props) => css`
    ${props.isFetching &&
    css`
      animation: ${moveLeftRight} 2s linear infinite;
      pointer-events: none;
      opacity: 0.3;
    `}
    ${props.isDisabled &&
    css`
      pointer-events: none;
      opacity: 0.3;
    `}
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    transition: 0.1s;
    transition-property: transform, opacity;

    &:hover {
      transform: translateX(5px);
    }

    &:active {
      transform: translateX(5px) scale(1.1);
    }
  `,
);

type StyledImageContainerPropsType = {
  borderRadius?: Property.BorderRadius;
  margin?: Property.Margin;
  width?: Property.Width;
  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  bgColor?: Property.BackgroundColor;
};
export const StyledMapContentPreview = styled.div<StyledImageContainerPropsType>((props) => ({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: props.borderRadius || "inherit",
  margin: props.margin,
  width: props.width,
  height: props.height,
  overflow: "hidden",
  maxHeight: props.maxHeight,
  transition: "0.2s",
  backgroundColor: props.bgColor,
  flexGrow: 1,
}));

export const StyledMessageDisabled = styled.div({
  display: "flex",
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  opacity: 0.7,
  userSelect: "none",
  msUserSelect: "none",
});

export const StyledSpoiler = styled.span<{ isOpened: boolean }>(
  ({ isOpened }) =>
    ({
      ...(!isOpened && {
        filter: "blur(6px)",
        msFilter: "blur(6px)",
        opacity: 0.6,
        cursor: "pointer",
      }),
    }) as CSSObject,
);
