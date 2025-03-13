import { Flex, } from '@ui/Layout';
import * as React from 'react';
import { StackProps } from '@ui/Layout/ui/Stack/common/types';
import { flexPropsByOrientationMapping } from '@ui/Layout/ui/Stack/common/constants';

const Stack = (props: StackProps) =>
  <Flex {...flexPropsByOrientationMapping[props.orientation]} {...props} />
export default React.memo(Stack);
