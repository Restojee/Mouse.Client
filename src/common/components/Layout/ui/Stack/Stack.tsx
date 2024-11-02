import { Flex, } from '@ui/Layout';
import React from 'react';
import { StackProps } from '@ui/Layout/ui/Stack/types';
import { flexPropsByOrientationMapping } from '@ui/Layout/ui/Stack/constants';

export const Stack = (props: StackProps) =>
  <Flex {...flexPropsByOrientationMapping[props.orientation]} {...props} />
