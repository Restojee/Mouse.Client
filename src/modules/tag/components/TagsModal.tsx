import React from "react";
import styles from "./TagsModal.module.scss";
import { useTagsModal } from "./useTagsModal";

const TagsModal = () => {
  const { renderedTags } = useTagsModal();

  return (
    <div className={styles.root}>
      <div className={styles.list}>{renderedTags}</div>
    </div>
  );
};

export default TagsModal;
