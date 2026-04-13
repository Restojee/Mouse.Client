import React from "react";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { MapContentMain } from "../../styles/MapContentMain/MapContentMain";
import { MapContentPaper } from "../../styles/MapContentPaper/MapContentPaper";
import { MapContentSidebar } from "../../styles/MapContentSidebar/MapContentSidebar";
import contentStyles from "./MapContent.module.scss";
import { useMapContent } from "./useMapContent";

export const MapContent = React.memo(() => {
  const { closeMap, fixEventPropagation, isMobile, sidebarContent, mainContent, closeIconColor } = useMapContent();

  return (
    <MapContentPaper onClick={fixEventPropagation}>
      {isMobile ? (
        <div className={contentStyles.mobileScrollArea}>{mainContent}</div>
      ) : (
        <MapContentMain>{mainContent}</MapContentMain>
      )}
      <MapContentSidebar>
        <ModalCloseIcon
          color={closeIconColor}
          onClick={closeMap}
        />
        {sidebarContent}
      </MapContentSidebar>
    </MapContentPaper>
  );
});

MapContent.displayName = "MapContent";
