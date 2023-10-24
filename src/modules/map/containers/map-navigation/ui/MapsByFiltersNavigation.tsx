import { navItems } from '../constants';
import { useMapNavigation } from '../hooks/useMapNavigation';
import { StyledBox } from '@/ui/Box';
import { SidebarSection } from '@/layout/sidebar/SidebarSection';
import { NavLink } from '@/layout/navigation/NavLink';
import { StyledNavLinkSection } from '@/layout/navigation/styles/StyledNavLinkSection';

type MapsByFiltersNavigationSectionProps = {
    isOpen: boolean;
}

export function MapsByFiltersNavigation(props: MapsByFiltersNavigationSectionProps) {
    const {
        navigateTo,
    } = useMapNavigation();

    return (
        <StyledBox
            transition="0.3s"
            margin={props.isOpen ? '0' : '-10px 0 0 0'}
            direction="column"
            gap={props.isOpen ? 5 : 10}
        >
            <SidebarSection
                label="Моя коллекция"
                isOpen={props.isOpen}
            />
            {navItems.map(({ label, IconComponent, query }) => (
                <NavLink
                    key={label}
                    onClick={() => navigateTo(query)}
                    label={label}
                    prepend={(
                        <StyledNavLinkSection isOpen={props.isOpen}>
                            <IconComponent/>
                        </StyledNavLinkSection>
                    )}
                    isOpen={props.isOpen}
                />
            ))}
        </StyledBox>
    );
}