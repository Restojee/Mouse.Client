import React, { useCallback, useMemo, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useMapCreate } from "@/modules/map/containers/map-create/hooks/useMapCreate";
import { useTag } from "@/modules/tag/hooks/useTag";
import { flattenTags } from "@/modules/tag/utils";
import { MapParametersTagItem } from "./MapParametersTagItem";

type TabKey = "map" | "completed";

export const useMapParametersForm = () => {
  const { theme } = useAppTheme();
  const [currentTab, setCurrentTab] = useState<TabKey>("map");

  const { image, completedMapImage, setImage, setCompletedMapImage } = useMapCreate();
  const { tagsList, openTagsModal, selectedIdForCreateMap } = useTag();

  const flatTagsList = useMemo(() => flattenTags(tagsList), [tagsList]);

  const selectedTags = useMemo(
    () => flatTagsList.filter((tag) => selectedIdForCreateMap?.includes(tag.id)),
    [flatTagsList, selectedIdForCreateMap],
  );

  const renderedTags = useMemo(
    () =>
      selectedTags.map((tag) => (
        <MapParametersTagItem
          key={tag.id}
          name={tag.name ?? ""}
        />
      )),
    [selectedTags],
  );

  const onMapTabClick = useCallback(() => setCurrentTab("map"), []);
  const onCompletedTabClick = useCallback(() => setCurrentTab("completed"), []);

  const isMapTab = currentTab === "map";
  const isCompletedTab = currentTab === "completed";
  const activeTabIndex = isMapTab ? 0 : 1;
  const hasSelectedTags = selectedTags.length > 0;
  const editButtonColor = theme.colors.brandColorContrastText;

  return {
    image,
    completedMapImage,
    setImage,
    setCompletedMapImage,
    openTagsModal,
    renderedTags,
    hasSelectedTags,
    isMapTab,
    isCompletedTab,
    activeTabIndex,
    editButtonColor,
    onMapTabClick,
    onCompletedTabClick,
  };
};
