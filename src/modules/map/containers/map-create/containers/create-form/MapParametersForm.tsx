import { useAppTheme } from "@/hooks/useAppTheme";
import { Tab } from "@/ui/Tabs/Tab";
import { Tabs } from "@/ui/Tabs/Tabs";
import { TabsPanel } from "@/ui/Tabs/TabsPanel";
import React, { useMemo, useState } from "react";
import { useMapCreate } from "@/modules/map/containers/map-create/hooks/useMapCreate";
import { useTag } from "@/modules/tag/hooks/useTag";
import { Button } from "@/ui/Button";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography/styles/Typography";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { ImageForm } from "@/ui/ImageForm/ImageForm";
import { StyledTag } from "@/ui/Tag/styled";
import { Display } from "@/ui/Display";

export const MapParametersForm = () => {
  const { theme } = useAppTheme();

  const [currentTab, setCurrentTab] = useState<"map" | "completed">("map");

  const { image, completedMapImage, setImage, setCompletedMapImage } = useMapCreate();

  const { tagsList, onOpenModal, selectedIdForCreateMap } = useTag();

  const selectedTags = useMemo(() => {
    return tagsList.filter((tag) => selectedIdForCreateMap?.includes(tag.id));
  }, [tagsList, selectedIdForCreateMap]);

  const onOpenModalHandler = () => {
    onOpenModal("map-tags-update");
  };

  return (
    <StyledBox
      width={"278px"}
      gap="15px"
      textAlign={"center"}
      direction="column"
      padding="15px"
    >
      <Typography style={{ textAlign: "center", fontWeight: 600 }}>Доп. параметры карты</Typography>
      <Tabs>
        <Tab
          onClick={() => setCurrentTab("map")}
          isActive={currentTab === "map"}
          label={"Обложка"}
        />
        <Tab
          onClick={() => setCurrentTab("completed")}
          isActive={currentTab === "completed"}
          label={"Постройка"}
        />
      </Tabs>
      <TabsPanel activeIndex={currentTab === "map" ? 0 : 1}>
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
      <StyledBox
        maxHeight={"150px"}
        wrap={"wrap"}
        gap={5}
        overflow={"auto"}
      >
        <Display condition={selectedTags.length}>
          <>
            <Typography>Теги: </Typography>
            {selectedTags?.map((tag) => (
              <StyledTag
                key={tag.id}
                small
              >
                {tag.name}
              </StyledTag>
            ))}
          </>
        </Display>
        <StyledBox margin={selectedTags.length ? "initial" : "10px auto 0 auto"}>
          <Button
            color={theme.colors.brandColorContrastText}
            onClick={onOpenModalHandler}
            size={"sm"}
            prepend={<EditFillIcon />}
            label={"Изменить теги"}
          />
        </StyledBox>
      </StyledBox>
    </StyledBox>
  );
};
