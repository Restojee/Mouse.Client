import React from "react";
import clsx from "clsx";
import { NavLinkSection } from "@/layout/navigation/styles/NavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { CreateTagPopup } from "@/modules/tag/components/CreateTagPopup";
import { AddIcon } from "@/svg/AddIcon";
import { Display } from "@/ui/Display";
import styles from "./TagsNavigation.module.scss";
import { useTagsNavigation } from "./useTagsNavigation";

type TagsNavigationPropsType = {
  isOpen: boolean;
  noScroll?: boolean;
};

export const TagsNavigation = (props: TagsNavigationPropsType) => {
  const { isOpen, noScroll } = props;
  const {
    isAuth,
    hasTags,
    isCreatePopupVisible,
    showCreatePopup,
    renderedTags,
    onCloseModal,
    modalToggleHandler,
  } = useTagsNavigation({ isOpen });

  const listClassName = clsx(styles.list, isOpen && styles.listOpen, noScroll && styles.listNoScroll);

  const addTagAnchor = (
    <NavLinkSection onClick={modalToggleHandler} isOpen={isAuth}>
      <AddIcon />
    </NavLinkSection>
  );

  return (
    <div className={styles.root}>
      <Display condition={hasTags}>
        <SidebarSection
          label="Поиск по тегам"
          isOpen={isOpen}
          append={
            <Display condition={showCreatePopup}>
              <CreateTagPopup
                isVisible={isCreatePopupVisible}
                onClose={onCloseModal}
                anchor={addTagAnchor}
              />
            </Display>
          }
        />
      </Display>
      <div className={listClassName}>{renderedTags}</div>
    </div>
  );
};
