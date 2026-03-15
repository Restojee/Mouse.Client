import { Property } from "csstype";
import styled from "styled-components";

export type StyledRoundButtonProps = {
  backgroundColor?: Property.BackgroundColor;
  size?: Property.FontSize;
  rotate?: string;
};
export const StyledRoundButton = styled.div<StyledRoundButtonProps>((props) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: props.size || 30,
  height: props.size || 30,
  backgroundColor: props.backgroundColor || props.theme.colors.primaryDark,
  cursor: "pointer",
  transition: "0.2s",
  svg: {
    transform: `rotate(${props.rotate})`,
    width: 18,
    height: 18,
  },
  "&:hover": {
    transform: "scale(0.9)",
  },
}));
