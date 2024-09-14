import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { selectIsAuth } from "@/modules/auth/slice";
import { selectFilter } from "@/modules/map/containers/map-list/slice";
import { TagItemActions } from "@/modules/tag/components/TagItemActions";
import { UpdateTagModal } from "@/modules/tag/components/UpdateTagModal";
import { useTag } from "@/modules/tag/hooks/useTag";
import { getTagsThunk } from "@/modules/tag/slice";
import { AddIcon } from "@/svg/AddIcon";
import { StyledBox } from "@/ui/Box";
import { Display } from "@/ui/Display";
import { Modal } from "@/ui/Modal/Modal";
import { ScrollBox } from "@/ui/ScrollBox/ScrollBox";
import React, { useEffect, useState } from "react";

type TagsNavigationSectionProps = {
  isOpen: boolean;
};

export function TagsNavigation(props: TagsNavigationSectionProps) {
  const { onTagDelete, modalType, onOpenModal, onCloseModal, tagsList } = useTag();

  const { updateFilter } = useFilterQueryParams();

  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);
  const filter = useAppSelector(selectFilter);
  const [tempTag, setTempTag] = useState<Tag>();

  const onTagClickHandler = async (id: Tag["id"]) => {
    await updateFilter({ page: 1 });
    if (filter.tagIds?.includes(id)) {
      await updateFilter({ tagIds: filter.tagIds?.filter((el) => id !== el) });
      return;
    } else if (filter.tagIds) {
      await updateFilter({ tagIds: [...filter.tagIds, id] });
      return;
    } else {
      await updateFilter({ tagIds: [id] });
    }
  };

  const modalToggleHandler = () => {
    if (modalType === "tag-create") {
      onOpenModal(null);
    } else {
      onOpenModal("tag-create");
    }
  };

  useEffect(() => {
    dispatch(getTagsThunk());
  }, []);

  if (props.isOpen) {
    return (
      <StyledBox
        direction="column"
        gap={10}
        padding="5px"
        overflow={"hidden"}
      >
        <Display condition={tagsList.length}>
          <SidebarSection
            label="Поиск по тегам"
            append={
              <Display condition={isAuth}>
                <StyledNavLinkSection
                  onClick={modalToggleHandler}
                  isOpen={props.isOpen && isAuth}
                >
                  <AddIcon />
                </StyledNavLinkSection>
              </Display>
            }
            isOpen={props.isOpen}
          />
        </Display>
        <ScrollBox>
          {tagsList?.map((el) => (
            <NavLink
              key={el.id}
              label={el.name}
              description={el.description}
              onClick={() => onTagClickHandler(el.id)}
              isChecked={filter.tagIds?.includes(el.id)}
              append={
                isAuth ? (
                  <TagItemActions
                    tag={el}
                    setTempTag={setTempTag}
                  />
                ) : undefined
              }
              justifyContent="space-between"
              isOpen={props.isOpen}
            />
          ))}
        </ScrollBox>
        <Modal
          isOpen={modalType === "tag-delete"}
          text={"Вы действительно хотите удалить тег?"}
          onAccess={() => onTagDelete(tempTag?.id)}
          onClose={onCloseModal}
        />
        <UpdateTagModal tag={tempTag} />
      </StyledBox>
    );
  }
  return null;
}
