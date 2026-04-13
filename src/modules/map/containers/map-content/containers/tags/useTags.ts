import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { useTag } from "@/modules/tag/hooks/useTag";
import clsx from "clsx";
import { useCallback } from "react";
import tagStyles from "@/ui/Tag/Tag.module.scss";

export const useTags = () => {
  const { theme } = useAppTheme();
  const isAuth = useAppSelector(selectIsAuth);
  const { openTagsModal } = useTag();

  const tagClassName = clsx(tagStyles.tag, tagStyles.primaryLighter);

  const onOpenModalHandler = useCallback(() => {
    openTagsModal();
  }, [openTagsModal]);

  return {
    theme,
    isAuth,
    tagClassName,
    onOpenModalHandler,
  };
};
