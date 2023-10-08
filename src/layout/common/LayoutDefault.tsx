import { Drawer } from '@/layout/drawer/Drawer';
import { Panel, TabsType } from '@/layout/panel/Panel';
import { Sidebar } from '@/layout/sidebar/Sidebar';
import { StyledLayout, StyledWrapper } from '@/layout/StyledLayout';
import * as React from 'react';

type DefaultProps = {
    children: React.ReactElement;
}
export const LayoutDefault: React.FC<DefaultProps> = (props) => {
    const [ isOpen, setIsOpen ] = React.useState(true);
    const [ activeTab, setActiveTab ] = React.useState<TabsType>('notifications')

    return (
        <StyledLayout>
            <Sidebar />
            <StyledWrapper>
                { props.children }
                { isOpen && (
                    <Drawer
                        isOpen={ isOpen }
                        activeTab={ activeTab }
                    />
                ) }
            </StyledWrapper>
            <Panel
                setActiveTab={ setActiveTab }
                activeTab={ activeTab }
                isOpen={ isOpen }
                setIsOpen={ setIsOpen }
            />
        </StyledLayout>
    )
}