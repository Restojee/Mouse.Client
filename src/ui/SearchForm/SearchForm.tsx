import { SearchFormContainer, SearchInput } from "./styled";
import { SearchIcon } from "@/svg/SearchIcon";
import { StyledIconContainer } from "@/svg/common/IconContainer";
import { Property } from "csstype";

type PropsType = {
  width?: Property.Width;
  placeholder?: string;
};
export const SearchForm = (props: PropsType) => {
  return (
    <SearchFormContainer width={props.width}>
      <StyledIconContainer>
        <SearchIcon />
      </StyledIconContainer>
      <SearchInput placeholder={props.placeholder} />
    </SearchFormContainer>
  );
};
