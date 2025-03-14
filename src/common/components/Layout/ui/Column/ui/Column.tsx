import React from 'react';
import { FlexProps } from "@ui/Layout";
import { Stack } from "@ui/Layout/ui/Stack";

export interface ColumnProps extends FlexProps {}
const Column = (props: ColumnProps) => <Stack orientation="vertical" {...props} />;
export default React.memo(Column)
