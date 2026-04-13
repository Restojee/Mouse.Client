import React from "react";
import clsx from "clsx";
import { NavLink } from "@/layout/navigation/NavLink";
import { NavLinkSection } from "@/layout/navigation/styles/NavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { WidgetIcon } from "@/svg/WidgetIcon";
import styles from "./MapsByCategoryNavigation.module.scss";
import { useMapsByCategoryNavigation } from "./useMapsByCategoryNavigation";

type MapsByCategoryNavigationPropsType = {
  isOpen: boolean;
};

export const MapsByCategoryNavigation = React.memo((props: MapsByCategoryNavigationPropsType) => {
  const { isAllChecked, onAllClickHandler } = useMapsByCategoryNavigation();
  const rootClassName = clsx(styles.root, props.isOpen && styles.open);

  return (
    <div className={rootClassName}>
      <SidebarSection label="Общие разделы" isOpen={props.isOpen} />
      <NavLink
        onClick={onAllClickHandler}
        isChecked={isAllChecked}
        label="Все карты"
        prepend={
          <NavLinkSection isOpen={props.isOpen}>
            <WidgetIcon />
          </NavLinkSection>
        }
        isOpen={props.isOpen}
      />
    </div>
  );
});

MapsByCategoryNavigation.displayName = "MapsByCategoryNavigation";
