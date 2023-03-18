import {ReactNode, useState} from "react";
import {Panel, TabsType} from "@/layout/panel/Panel";
import {Drawer} from "@/layout/drawer/Drawer";
import {Sidebar} from "@/layout/sidebar/Sidebar";
import {StyledLayout, StyledWrapper} from "@/layout/StyledLayout";

type Props = {
    children: ReactNode;
}
export const Layout = (props: Props) => {

    const { children } = props;

    const [ isOpen, setIsOpen ] = useState(true)
    const [ activeTab, setActiveTab ] = useState<TabsType>('notifications')

    return (
        <StyledLayout>
            <Sidebar />
            <StyledWrapper>
                { children }
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