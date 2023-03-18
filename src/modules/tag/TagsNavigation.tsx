import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { NavLink } from "@/layout/navigation/NavLink";
import { CloseIcon } from "@/svg/CloseIcon";
import { useGetTagsQuery } from "@/api/tagsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { PointBlock } from "@/ui/PointBlock/PointBlock";
import { AddIcon } from "@/svg/AddIcon";
import {CreateTagPopup} from "@/modules/tag/CreateTagPopup";


type TagsNavigationSectionProps = {
    isOpen: boolean;
}
export function TagsNavigation(props: TagsNavigationSectionProps) {
    const { data: tags } = useGetTagsQuery();
    return (
        <StyledBox
            direction="column"
            gap={ 0 }
            padding="5px"
        >
            <SidebarSection
                label="Поиск по тегам"
                append={
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <AddIcon />
                    </StyledNavLinkSection>
                }
                prepend={
                    <CreateTagPopup />
                }
                isOpen={ props.isOpen }
            />
            { tags?.map(el => (
                <NavLink
                    key={ el.id }
                    label={ el.name }
                    isChecked={ false }
                    append={ (
                        <StyledNavLinkSection>
                            <CloseIcon />
                        </StyledNavLinkSection>
                    ) }
                    justifyContent="space-between"
                    isOpen={ props.isOpen }
                />
            )) }
        </StyledBox>
    )
}