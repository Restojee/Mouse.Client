import { useMapNavigation } from '../hooks/useMapNavigation';
import { StyledBox } from "@/ui/Box";
import { SidebarSection } from "@/layout/sidebar/SidebarSection";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { WidgetIcon } from "@/svg/WidgetIcon";

type MapsByCategoryNavigationSectionProps = {
    isOpen: boolean
}
export function MapsByCategoryNavigation(props: MapsByCategoryNavigationSectionProps) {
    const {
        filters,
        navigateTo,
    } = useMapNavigation();

    return (
        <StyledBox
            transition="0.3s"
            direction="column"
            gap={ props.isOpen ? 5 : 10 }
        >
            <SidebarSection
                label="Общие разделы"
                isOpen={ props.isOpen }
            />
            <NavLink
                onClick={()=> navigateTo({})}
                isChecked={!filters.userId}
                label="Все карты"
                prepend={(
                    <StyledNavLinkSection isOpen={ props.isOpen }>
                        <WidgetIcon />
                    </StyledNavLinkSection>
                )}
                isOpen={ props.isOpen }
            />
        </StyledBox>
    )
}