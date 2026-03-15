import styled from "styled-components";
import { Property } from "csstype";
import { StyledInput } from "@/ui/Form/styled";

export const SearchFormContainer = styled.div<{ width?: Property.Width }>((props) => ({
  display: "flex",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  width: props.width,
}));

export const SearchInput = styled(StyledInput)({
  width: "100%",
  padding: 10,
});
