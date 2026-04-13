import React from "react";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { BoxLoader } from "@/ui/BoxLoader/BoxLoader";
import { Display } from "@/ui/Display/Display";
import { MessageList } from "@/ui/MessageList/MessageList";
import { MessageSendFormContainer } from "@/ui/Message/MessagesSendForm";
import styles from "./SidebarComments.module.scss";
import { useSidebarComments } from "./useSidebarComments";

type SidebarCommentsPropsType = {
  levelId: Map["id"];
};

export const SidebarComments = ({ levelId }: SidebarCommentsPropsType) => {
  const {
    commentText,
    onInputChange,
    isCommentsInitialized,
    isCommentCreateFetching,
    isAuth,
    scrollToBottomRef,
    onFocusHandler,
    onCommentAddHandler,
    hasComments,
    showEmpty,
    renderedComments,
  } = useSidebarComments({ levelId });

  return (
    <div className={styles.root}>
      <Display condition={hasComments}>
        <MessageList scrollRef={scrollToBottomRef}>{renderedComments}</MessageList>
      </Display>
      <BoxLoader isLoading={!isCommentsInitialized} />
      <Display condition={showEmpty}>
        <div className={styles.empty}>Комментариев пока нет</div>
      </Display>
      <MessageSendFormContainer
        isFetching={isCommentCreateFetching}
        disabled={!isAuth}
        value={commentText}
        onFocus={onFocusHandler}
        onChange={onInputChange}
        onSendClick={onCommentAddHandler}
      />
    </div>
  );
};
