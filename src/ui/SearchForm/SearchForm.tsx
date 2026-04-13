import { SearchIcon } from "@/svg/SearchIcon";
import { IconContainer } from "@/svg/common/IconContainer";
import { Property } from "csstype";
import searchStyles from "./SearchForm.module.scss";
import formStyles from "@/ui/Form/Form.module.scss";

type PropsType = {
  width?: Property.Width;
  placeholder?: string;
};
export const SearchForm = (props: PropsType) => {
  return (
    <div
      className={searchStyles.container}
      style={props.width ? { width: props.width } : undefined}
    >
      <IconContainer>
        <SearchIcon />
      </IconContainer>
      <input
        className={[formStyles.input, searchStyles.searchInput].filter(Boolean).join(" ")}
        placeholder={props.placeholder}
      />
    </div>
  );
};
