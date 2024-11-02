import { Flex, SpaceProps } from '@common/.';
import React from 'react';

export const Space = (props: SpaceProps) => {
  const { children, direction = 'row' } = props;

  return (
    <Flex direction={direction}>
      {children}
    </Flex>
  );
};
