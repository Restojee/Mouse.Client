import React from "react";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { MapContentMain } from "../../styles/MapContentMain/MapContentMain";
import { MapContentPaper } from "../../styles/MapContentPaper/MapContentPaper";
import { MapContentSidebar } from "../../styles/MapContentSidebar/MapContentSidebar";
import contentStyles from "./MapContent.module.scss";
import { SidebarContent } from "./containers/sidebar/SidebarContent";
import { useMapContent } from "./useMapContent";
import { Column } from "@/ui/Column";

type MapContentProps = {
  onClose?: () => void;
};

export const MapContent = React.memo(({ onClose }: MapContentProps) => {
  const { closeMap, fixEventPropagation, isMobile, mainContent, closeIconColor } = useMapContent();

  const handleClose = onClose ?? closeMap;

  return (
    <MapContentPaper onClick={fixEventPropagation}>
      {isMobile ? (
        <Column className={contentStyles.mobileScrollArea}>{mainContent}</Column>
      ) : (
        <MapContentMain>{mainContent}</MapContentMain>
      )}
      <MapContentSidebar>
        <ModalCloseIcon
          color={closeIconColor}
          onClick={handleClose}
        />
        <SidebarContent />
      </MapContentSidebar>
    </MapContentPaper>
  );
});

MapContent.displayName = "MapContent";
