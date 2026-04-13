import React, { useMemo } from "react";
import { useTag } from "@/modules/tag/hooks/useTag";
import { TagsModalItem } from "./TagsModalItem";

export const useTagsModal = () => {
  const { tagsList, toggleSelectedTag, checkIsSelectedTagId } = useTag();

  const renderedTags = useMemo(
    () =>
      tagsList.map(({ name, id }) => (
        <TagsModalItem
          key={id}
          id={id}
          name={name}
          isActive={checkIsSelectedTagId(id)}
          onToggle={toggleSelectedTag}
        />
      )),
    [tagsList, toggleSelectedTag, checkIsSelectedTagId],
  );

  return { renderedTags };
};
