import { Stack } from '@common/.';
import { StackProps } from '@ui/Layout/ui/Stack/types';
import React from 'react';

export type ColumnProps = Pick<StackProps, 'children' | 'className' | 'gap' | 'height' | 'width'>
const Column = (props: ColumnProps) => <Stack {...props} orientation="vertical" />;
export default React.memo(Column)