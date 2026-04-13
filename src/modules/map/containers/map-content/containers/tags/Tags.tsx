import React from "react";
import { Button } from "@/ui/Button";
import { Display } from "@/ui/Display";
import { Tag } from "@/api/codegen/genMouseMapsApi";
import { EditFillIcon } from "@/svg/EditFillIcon";
import tagsContainerStyles from "@/modules/map/containers/map-content/containers/tags/Tags.module.scss";
import { Typography } from "@/ui/Typography";
import { useTags } from "./useTags";

type MapContentFooterPropsType = {
  tags?: Tag[];
};

export const Tags = ({ tags }: MapContentFooterPropsType) => {
  const { theme, isAuth, tagClassName, onOpenModalHandler } = useTags();

  return (
    <div className={tagsContainerStyles.tagsOuter}>
      <Display condition={tags?.length}>
        <div className={tagsContainerStyles.tagsList}>
          {tags?.map(({ name, id }) => (
            <div
              key={id}
              className={tagClassName}
            >
              <Typography isEllipsis>{name}</Typography>
            </div>
          ))}
          <Display condition={isAuth}>
            <Button
              bgColor={theme.colors.secondaryAccent}
              onClick={onOpenModalHandler}
              label={"Изменить"}
              prepend={<EditFillIcon />}
              size="sm"
            />
          </Display>
        </div>
      </Display>
      <Display condition={!tags?.length}>
        <Button
          disabled={!isAuth}
          size={"md"}
          onClick={onOpenModalHandler}
          label={"Изменить теги"}
          prepend={<EditFillIcon />}
        />
      </Display>
    </div>
  );
};
