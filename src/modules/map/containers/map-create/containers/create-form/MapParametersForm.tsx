import React from "react";
import clsx from "clsx";
import { Tab } from "@/ui/Tabs/Tab";
import { Tabs } from "@/ui/Tabs/Tabs";
import { TabsPanel } from "@/ui/Tabs/TabsPanel";
import { Button } from "@/ui/Button";
import { Typography } from "@/ui/Typography/styles/Typography";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { ImageForm } from "@/ui/ImageForm/ImageForm";
import { Display } from "@/ui/Display";
import formStyles from "./MapParametersForm.module.scss";
import { useMapParametersForm } from "./useMapParametersForm";

export const MapParametersForm = () => {
  const {
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
  } = useMapParametersForm();

  const editButtonWrapperClass = clsx(formStyles.editButton, hasSelectedTags && formStyles.editButtonInline);

  return (
    <div className={formStyles.form}>
      <Typography className={formStyles.title}>Доп. параметры карты</Typography>
      <Tabs>
        <Tab
          onClick={onMapTabClick}
          isActive={isMapTab}
          label={"Обложка"}
        />
        <Tab
          onClick={onCompletedTabClick}
          isActive={isCompletedTab}
          label={"Постройка"}
        />
      </Tabs>
      <TabsPanel activeIndex={activeTabIndex}>
        <ImageForm
          subTextSize={"sm"}
          fileType="image"
          onChange={setImage}
          value={image || null}
          messageWords={"обложку карты"}
        />
        <ImageForm
          subTextSize={"sm"}
          fileType="image"
          onChange={setCompletedMapImage}
          value={completedMapImage || null}
          messageWords={"свою постройку"}
        />
      </TabsPanel>
      <div className={formStyles.tagsContainer}>
        <Display condition={hasSelectedTags}>
          <>
            <Typography>Теги: </Typography>
            {renderedTags}
          </>
        </Display>
        <div className={editButtonWrapperClass}>
          <Button
            color={editButtonColor}
            onClick={openTagsModal}
            size={"sm"}
            prepend={<EditFillIcon />}
            label={"Изменить теги"}
          />
        </div>
      </div>
    </div>
  );
};
