import { Typography } from "@/ui/Typography/styles/Typography";
import React from "react";
import { DropdownItemStyled } from "./dropdownElements";
import { DefaultOption } from "@/ui/Dropdown/Dropdown";

type PropsType = {
  onClick: (option: DefaultOption) => void;
  label?: string | number;
  option?: DefaultOption;
};

function DropdownItem(props: PropsType) {
  const onClick = () => {
    if (!props.option) {
      return;
    }
    props.onClick?.(props.option);
  };

  return (
    <>
      {props.label ? (
        <DropdownItemStyled
          key={props.option?.id}
          onClick={onClick}
        >
          {/*{ props.leftIcon && <StyledIconContainer left>{ props.leftIcon }</StyledIconContainer> }*/}
          <Typography>{props.label}</Typography>
          {/*<StyledIconButton right>{ props.rightIcon }</StyledIconButton>*/}
        </DropdownItemStyled>
      ) : (
        <DropdownItemStyled
          blockedItem
          onClick={onClick}
        >
          <Typography>Не найдено</Typography>
        </DropdownItemStyled>
      )}
    </>
  );
}

export default DropdownItem;
