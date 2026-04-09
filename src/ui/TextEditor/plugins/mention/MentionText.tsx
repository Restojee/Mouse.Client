import React, { ReactNode, useCallback } from "react";
import { TextLink } from "@/ui/TextLink/TextLink";
import { splitMentions } from "./useMentionPlugin";

type MentionTextProps = {
  text: string;
  onUserClick?: (username: string) => void;
  fontSize?: string;
};
export const MentionText = ({ text, onUserClick, fontSize }: MentionTextProps) => {
  const handleMentionClick = useCallback(
    (username: string) => {
      onUserClick?.(username);
    },
    [onUserClick],
  );

  const segments = splitMentions(text);

  const rendered: ReactNode[] = segments.map((seg, i) => {
    if (typeof seg === "string") {
      return (
        <TextLink
          key={i}
          fontSize={fontSize}
          onClick={() => handleMentionClick(seg)}
        >
          @{seg}
        </TextLink>
      );
    }

    return (
      <TextLink
        key={i}
        fontSize={fontSize}
        onClick={() => handleMentionClick(seg.username)}
      >
        @{seg.username}
      </TextLink>
    );
  });

  return <>{rendered}</>;
};
