import { FlexProps, Stack } from "@common/.";
import { StackProps } from '@ui/Layout/ui/Stack/types';
import React from 'react';

export type ColumnProps = Pick<FlexProps, 'pa' | 'align' | 'wrap' | 'rowGap' | 'className' | 'children' | 'width' | 'height' | 'gap'>
const Column = (props: ColumnProps) => <Stack {...props} orientation="vertical" />;
export default React.memo(Column)