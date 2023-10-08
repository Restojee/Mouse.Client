import { LayoutProps } from '@/layout/common/withLayout';
import React from 'react';

export const CustomLayout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="custom_layout">
            { props.children }
        </div>
    )
}