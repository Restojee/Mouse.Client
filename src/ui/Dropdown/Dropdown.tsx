import { ArrowIcon } from "@/svg/ArrowIcon";
import FormElement from "@/ui/Form/FormElement";
import React, { useState } from "react";
import { DropdownContainer, DropdownList } from "./dropdownElements";
import DropdownItem from "./DropdownItem";

interface Props {
  width: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  dropdownItemsArray: Array<{ id: number; label: string }>;
}

export default function Dropdown(props: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const onInputClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onItemClickHandler = (index: number) => {
    setIsDropdownOpen(!isDropdownOpen);
    setSelectedItem(index);
  };

  return (
    <DropdownContainer
      width={props.width}
      isOpen={isDropdownOpen}
    >
      <FormElement
        readOnly
        isOpen={isDropdownOpen}
        onClick={onInputClickHandler}
        placeholder={props.dropdownItemsArray[selectedItem].label}
        name="selected"
        type="text"
        inputPrepend={props.leftIcon}
        inputAppend={
          props.rightIcon || (
            <ArrowIcon
              color="gray"
              rotate={isDropdownOpen ? "270deg" : "90deg"}
            />
          )
        }
      />
      {isDropdownOpen && (
        <DropdownList
          width="100%"
          isOpen={isDropdownOpen}
        >
          {props.dropdownItemsArray.map((obj, index) => (
            <DropdownItem
              {...obj}
              key={index}
              index={index.toString()}
              onClick={() => onItemClickHandler(index)}
            />
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}
