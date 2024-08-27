import { StyledMapCardFooter } from "@/modules/map/styles/StyledMapCardFooter";
import styled from "styled-components";

export const StyledMapCardHeader = styled(StyledMapCardFooter)({
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
  bottom: "initial",
  top: 0,
  opacity: 1,
  zIndex: 2,
});
