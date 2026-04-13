import React, { memo, ComponentType } from "react";
import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { NavLink } from "@/layout/navigation/NavLink";
import { NavLinkSection } from "@/layout/navigation/styles/NavLinkSection";

type NavFilterItemPropsType = {
  label: string;
  IconComponent: ComponentType;
  query: Partial<GetMapsApiArg>;
  isChecked: boolean;
  isOpen: boolean;
  onSelect: (query: Partial<GetMapsApiArg>) => void;
};

export const NavFilterItem = memo((props: NavFilterItemPropsType) => {
  const { label, IconComponent, query, isChecked, isOpen, onSelect } = props;
  const handleClick = () => onSelect(query);

  return (
    <NavLink
      onClick={handleClick}
      label={label}
      isChecked={isChecked}
      prepend={
        <NavLinkSection isOpen={isOpen}>
          <IconComponent />
        </NavLinkSection>
      }
      isOpen={isOpen}
    />
  );
});

NavFilterItem.displayName = "NavFilterItem";
