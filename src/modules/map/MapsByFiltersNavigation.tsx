import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection}  from "@/layout/navigation/styles/StyledNavLinkSection";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { BookCheckFillIcon } from "@/svg/BookCheckFillIcon";
import { BookFillIcon } from "@/svg/BookFillIcon";
import { CommentFillIcon } from "@/svg/CommentFillIcon";
import { BookmarkIcon } from "@/svg/BookmarkIcon";

export

type MapsByFiltersNavigationSectionProps = {
    isOpen: boolean;
}
export function MapsByFiltersNavigation(props: MapsByFiltersNavigationSectionProps) {
    return (
        <StyledBox
            transition="0.3s"
            margin={ props.isOpen ? "0" : "-10px 0 0 0" }
            direction="column"
            gap={ props.isOpen ? 5 : 10 }
        >
            <SidebarSection
                label="Моя коллекция"
                isOpen={ props.isOpen }
            />
            <NavLink
                label="Избранное"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <FavoriteIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
            <NavLink
                label="Выполненные"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <BookCheckFillIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
            <NavLink
                label="Невыполненные"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <BookFillIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
            <NavLink
                label="Прокомментированные"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <CommentFillIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
            <NavLink
                label="Карты с заметкой"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <BookmarkIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
        </StyledBox>
    )
}