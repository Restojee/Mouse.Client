import { LayoutContext } from '@/layout/common/LayoutContext';
import { LayoutDefault } from '@/layout/common/LayoutDefault';
import { LayoutProps } from '@/layout/common/withLayout';
import * as React from 'react';

interface LayoutContainerProps {
    layout: React.FC<LayoutProps>;
    children: React.ReactElement;
}

type ILayoutContainer = React.FC<LayoutContainerProps>;
export const LayoutContainer: ILayoutContainer = (props) => {
    const layoutContext = React.useContext(LayoutContext);

    React.useEffect(() => {
        layoutContext.setLayout(() => props.layout);
        return () => layoutContext.setLayout(() =>LayoutDefault);
    }, [])

    return props.children
}