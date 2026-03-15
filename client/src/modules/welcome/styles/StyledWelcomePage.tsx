import styled from "styled-components";
import { StyledPage } from "@/layout/page/styles/StyledPage";

export const StyledWelcomePage = styled(StyledPage)((props) => ({
  color: "#ffffff",
  justifyContent: "center",
  fontSize: "70px",
  backgroundColor: props.theme.colors.primary,
  fontFamily: props.theme.font.logoFont,
  zIndex: props.theme.order.other + 1,
}));
