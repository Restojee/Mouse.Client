import { ArrowIcon } from "@/svg/ArrowIcon";
import FormElement from "@/ui/Form/FormElement";
import React, { useState } from "react";
import { DropdownContainer, DropdownList } from "./dropdownElements";
import DropdownItem from "./DropdownItem";

export interface DefaultOption {
  label?: string;
  name?: string;
  id?: string | number;
}

interface Props {
  width: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  options: DefaultOption[];
  value?: DefaultOption;
  placeholder?: string;
  onChange?: (option: DefaultOption) => void;
  optionKey?: keyof DefaultOption;
}

export default function Dropdown(props: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onInputClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onItemClickHandler = (value: DefaultOption) => {
    setIsDropdownOpen(!isDropdownOpen);
    props.onChange?.(value);
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
        placeholder={props.placeholder || String(props.value?.[props.optionKey || "label"]) || ""}
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
          {props.options.map((el, index) => (
            <DropdownItem
              option={el}
              label={el[props.optionKey || "label"]}
              key={index}
              onClick={onItemClickHandler}
            />
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}
