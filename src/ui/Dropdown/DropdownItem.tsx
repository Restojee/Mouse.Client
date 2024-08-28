import { Typography } from "@/ui/Typography/styles/Typography";
import React from "react";
import { DropdownItemStyled } from "./dropdownElements";

type PropsType = {
  onClick: () => void;
  index: string;
  label: string;
};

function DropdownItem(props: PropsType) {
  const ItemClick = () => {
    props.onClick();
  };

  return (
    <>
      {props.label ? (
        <DropdownItemStyled
          key={props.index}
          onClick={() => ItemClick()}
        >
          {/*{ props.leftIcon && <StyledIconContainer left>{ props.leftIcon }</StyledIconContainer> }*/}
          <Typography>{props.label}</Typography>
          {/*<StyledIconButton right>{ props.rightIcon }</StyledIconButton>*/}
        </DropdownItemStyled>
      ) : (
        <DropdownItemStyled
          blockedItem
          onClick={() => ItemClick()}
        >
          <Typography>Не найдено</Typography>
        </DropdownItemStyled>
      )}
    </>
  );
}

export default DropdownItem;
