import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import useQueryParams from '@/hooks/useQueryParams';
import { selectIsAuth } from '@/modules/auth/slice';
import { selectFilter } from '@/modules/map/containers/map-list/slice';
import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledNavLinkSection } from '@/layout/navigation/styles/StyledNavLinkSection';
import { SidebarSection } from '@/layout/sidebar/SidebarSection';
import { NavLink } from '@/layout/navigation/NavLink';
import { getTagsThunk } from '@/modules/tag/slice';
import { CloseIcon } from '@/svg/CloseIcon';
import { AddIcon } from '@/svg/AddIcon';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import { Modal } from '@/ui/Modal/Modal';
import { ScrollBox } from '@/ui/ScrollBox/ScrollBox';
import React, { useEffect, useState } from 'react';

type TagsNavigationSectionProps = {
    isOpen: boolean;
}

export function TagsNavigation(props: TagsNavigationSectionProps) {
    const {
        onTagDelete,
        modalType,
        onOpenModal,
        onCloseModal,
        tagsList,
    } = useTag();

    const { updateFilter } = useQueryParams();

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const filter = useAppSelector(selectFilter);
    const [tagId, setTagId] = useState<Tag['id'] | null>(null);

    const onTagClickHandler =  async (id: Tag['id']) => {
        if (filter.tagIds?.includes(id)) {
            await updateFilter({ tagIds: filter.tagIds?.filter(el => id !== el) });
            return;
        } else if (filter.tagIds) {
            await updateFilter({ tagIds: [...filter.tagIds, id] });
            return;
        } else {
            await updateFilter({ tagIds: [id] });
        }
    };

    const onTagDeleteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: Tag['id']) => {
        e.stopPropagation();
        setTagId(id);
        onOpenModal('tag-delete');
    };

    const modalToggleHandler = () => {
        if (modalType === 'tag-create') {
            onOpenModal(null);
        } else {
            onOpenModal('tag-create');
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
                overflow={'hidden'}
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
                                  <AddIcon/>
                              </StyledNavLinkSection>
                          </Display>
                      }
                      isOpen={props.isOpen}
                    />
                </Display>
                <ScrollBox>
                    {tagsList?.map(el => (
                        <NavLink
                            key={el.id}
                            label={el.name}
                            onClick={() => onTagClickHandler(el.id)}
                            isChecked={filter.tagIds?.includes(el.id)}
                            append={(
                                <Display condition={isAuth}>
                                    <StyledNavLinkSection onClick={(e) => onTagDeleteHandler(e, el.id)}>
                                        <CloseIcon/>
                                    </StyledNavLinkSection>
                                </Display>
                            )}
                            justifyContent="space-between"
                            isOpen={props.isOpen}
                        />
                    ))}
                </ScrollBox>
                <Modal
                    isOpen={modalType === 'tag-delete'}
                    text={'Вы действительно хотите удалить тег?'}
                    onAccess={() => onTagDelete(tagId)}
                    onClose={onCloseModal}
                />
            </StyledBox>
        );
    }
    return null;
}