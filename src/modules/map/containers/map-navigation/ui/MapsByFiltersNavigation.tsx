import React from "react";
import clsx from "clsx";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import styles from "./MapsByFiltersNavigation.module.scss";
import { useMapsByFiltersNavigation } from "./useMapsByFiltersNavigation";

type MapsByFiltersNavigationPropsType = {
  isOpen: boolean;
};

export const MapsByFiltersNavigation = (props: MapsByFiltersNavigationPropsType) => {
  const { renderedItems } = useMapsByFiltersNavigation(props);
  const rootClassName = clsx(styles.root, props.isOpen && styles.open);

  return (
    <div className={rootClassName}>
      <SidebarSection
        label="Моя коллекция"
        isOpen={props.isOpen}
      />
      {renderedItems}
    </div>
  );
};
