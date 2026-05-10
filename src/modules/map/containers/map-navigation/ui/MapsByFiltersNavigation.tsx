import React from "react";
import clsx from "clsx";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { ChevronRightIcon } from "@/svg/ChevronRightIcon";
import styles from "./MapsByFiltersNavigation.module.scss";
import { useMapsByFiltersNavigation } from "./useMapsByFiltersNavigation";

type MapsByFiltersNavigationPropsType = {
  isOpen: boolean;
};

export const MapsByFiltersNavigation = (props: MapsByFiltersNavigationPropsType) => {
  const { renderedItems, isCollapsed, onToggleCollapse } = useMapsByFiltersNavigation(props);
  const rootClassName = clsx(styles.root, props.isOpen && styles.open);
  const iconClassName = clsx(styles.collapseIcon, !isCollapsed && styles.collapseIconOpen);

  return (
    <div className={rootClassName}>
      <div
        className={styles.sectionButton}
        onClick={onToggleCollapse}
      >
        <SidebarSection
          label="Моя коллекция"
          isOpen={props.isOpen}
          append={
            props.isOpen ? (
              <ChevronRightIcon
                size="14px"
                className={iconClassName}
              />
            ) : undefined
          }
          justifyContent="space-between"
        />
      </div>
      {!isCollapsed ? renderedItems : null}
    </div>
  );
};
