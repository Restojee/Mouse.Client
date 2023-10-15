import { Tag } from '@/api/codegen/genMouseMapsApi';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledNavLinkSection } from '@/layout/navigation/styles/StyledNavLinkSection';
import { SidebarSection } from '@/layout/sidebar/SidebarSection';
import { NavLink } from '@/layout/navigation/NavLink';
import { CloseIcon } from '@/svg/CloseIcon';
import { AddIcon } from '@/svg/AddIcon';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import { Modal } from '@/ui/Modal/Modal';
import { ScrollBox } from '@/ui/ScrollBox/ScrollBox';
import { useState } from 'react';

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

    const isAuth = useAppSelector(selectIsAuth);
    const [tagId, setTagId] = useState<Tag['id'] | null>(null);

    const onTagDeleteHandler = (id: Tag['id']) => {
        setTagId(id)
        onOpenModal('delete')
    }

    if (props.isOpen) {
        return (
            <StyledBox
                direction="column"
                gap={10}
                padding="5px"
                overflow={'hidden'}
            >
                <SidebarSection
                    label="Поиск по тегам"
                    append={
                        <Display condition={isAuth}>
                            <StyledNavLinkSection
                                onClick={() => onOpenModal('create')}
                                isOpen={props.isOpen && isAuth}
                            >
                                <AddIcon/>
                            </StyledNavLinkSection>
                        </Display>
                    }
                    isOpen={props.isOpen}
                />
                <ScrollBox>
                    {tagsList?.map(el => (
                        <NavLink
                            key={el.id}
                            label={el.name}
                            isChecked={false}
                            append={(
                                <Display condition={isAuth}>
                                    <StyledNavLinkSection onClick={() => onTagDeleteHandler(el.id)}>
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
                    isOpen={modalType === 'delete'}
                    text={'Вы действительно хотите удалить тег?'}
                    onAccess={() => onTagDelete(tagId)}
                    onClose={onCloseModal}
                />
            </StyledBox>
        );
    }
    return null;
}