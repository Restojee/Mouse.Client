import React from "react";
import styles from "./TagsModal.module.scss";
import { useTagsModal } from "./useTagsModal";

const TagsModal = () => {
  const { renderedGroups, renderedPlainTags, hasGroups, hasPlainTags, groupsClassName, plainTagsClassName } =
    useTagsModal();

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {hasGroups ? <div className={groupsClassName}>{renderedGroups}</div> : null}
        {hasPlainTags ? <div className={plainTagsClassName}>{renderedPlainTags}</div> : null}
      </div>
    </div>
  );
};

export default TagsModal;
