import { useTag } from '@/modules/tag/hooks/useTag';
import { StyledBox } from "@/ui/Box";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { NavLink } from "@/layout/navigation/NavLink";
import { CloseIcon } from "@/svg/CloseIcon";
import { AddIcon } from "@/svg/AddIcon";
import { CreateTagPopup } from "@/modules/tag/containers/create-tag-popup/CreateTagPopup";
import { ScrollBox } from "@/ui/ScrollBox/ScrollBox";

type TagsNavigationSectionProps = {
    isOpen: boolean;
}

export function TagsNavigation(props: TagsNavigationSectionProps) {
    const {
        onTagDelete,
        onTagCreate,
        modalType,
        onOpenModal,
        onCloseModal,
        tagsList
    } = useTag();

    console.log(modalType)

    if (props.isOpen) {
        return (
            <StyledBox
                direction="column"
                gap={ 0 }
                padding="5px"
            >
                <SidebarSection
                    label="Поиск по тегам"
                    append={
                        <StyledNavLinkSection
                            onClick={ () => onOpenModal('create') }
                            isOpen={ props.isOpen }
                        >
                            <AddIcon />
                        </StyledNavLinkSection>
                    }
                    prepend={<CreateTagPopup isVisible={ modalType === 'create' } />}
                    isOpen={ props.isOpen }
                />
                <ScrollBox>
                    { tagsList?.map(el => (
                        <NavLink
                            key={ el.id }
                            label={ el.name }
                            isChecked={ false }
                            append={ (
                                <StyledNavLinkSection onClick={ () => onTagDelete(el.id) }>
                                    <CloseIcon />
                                </StyledNavLinkSection>
                            ) }
                            justifyContent="space-between"
                            isOpen={ props.isOpen }
                        />
                    )) }
                </ScrollBox>
                {/*<Modal*/}
                {/*    isOpen={ modalType === 'delete' }*/}
                {/*    text={'Вы действительно хотите удалить тег?'}*/}
                {/*    onAccess={ () => onTagDelete() }*/}
                {/*    onClose={ onCloseModal }*/}
                {/*/>*/}
            </StyledBox>
        )
    }
    return null
}