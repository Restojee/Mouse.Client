import React from 'react';
import { FlexProps } from "@ui/Layout";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";

import "./Grid.scss";

export interface GridProps extends Pick<FlexProps, 'children' | 'className'> {
  columns?: string;
  rows?: string;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  autoFit?: boolean;
  minColumnWidth?: string;
  width?: string;
}

const Grid: React.FC<WithAutoClassProps<GridProps>> = (props) => {
  const {
    children,
    autoClasses,
    ...otherProps
  } = props;

  return (
    <div 
      className={autoClasses}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default withAutoClasses(Grid, { 
  bindings: ['columns', 'rows', 'gap', 'columnGap', 'rowGap', 'autoFit', 'minColumnWidth', 'width'], 
  root: 'UiGrid' 
}); 