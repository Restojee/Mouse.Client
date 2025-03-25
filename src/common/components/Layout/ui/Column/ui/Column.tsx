import React from 'react';
import { FlexProps } from "@ui/Layout";
import { Stack } from "@ui/Layout/ui/Stack";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";

import "./Column.scss"
import { rootClass } from "@ui/Layout/ui/Column/common/constants";

export interface ColumnProps extends FlexProps {
  nonIntegrated?: boolean;
}

const Column: React.FC<WithAutoClassProps<ColumnProps>> = (props) =>
  <Stack className={props.autoClasses} orientation="vertical" {...props} />;

export default withAutoClasses(Column, { bindings: ['nonIntegrated'], root: rootClass });
