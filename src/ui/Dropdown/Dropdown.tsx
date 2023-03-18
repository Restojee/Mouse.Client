import React, { useState } from 'react';
import {
    DropdownContainer,
    DropdownList
} from './dropdownElements';
import DropdownItem from './DropdownItem';
import { ArrowIcon } from "@/svg/ArrowIcon";
import FormElement from "@/ui/Form/FormElement";

export default function Dropdown( props: any ) {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState(0);

    const onInputClickHandler = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const onItemClickHandler = (index: number) => {
        setIsDropdownOpen(!isDropdownOpen);
        setSelectedItem(index);
    };

    return (
        <DropdownContainer width={ props.width } isOpen={ isDropdownOpen }>
            <FormElement
                readOnly
                isOpen={ isDropdownOpen }
                onClick={ onInputClickHandler }
                placeholder={ props.dropdownItemsArray[selectedItem].label }
                name="selected"
                type="text"
                inputPrepend={ props.leftIcon }
                inputAppend={
                    props.rightIcon ||
                        <ArrowIcon
                            color="gray"
                            rotate={ isDropdownOpen ? '270deg' : '90deg' }
                        />
                }
            />
            { isDropdownOpen && (
                <DropdownList width="100%" isOpen={isDropdownOpen}>
                    { props.dropdownItemsArray.map((obj: any, index: any) => (
                        <DropdownItem
                            { ...obj }
                            key={ index }
                            onClick={ () => onItemClickHandler(index) }
                        />
                    )) }
                </DropdownList>
            )}
        </DropdownContainer>
    );
}
