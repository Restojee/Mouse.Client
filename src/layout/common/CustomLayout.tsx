import React from 'react';
import { LayoutProps } from '@/layout/common/withLayout';

export const CustomLayout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="custom_layout">
            { props.children }
        </div>
    )
}