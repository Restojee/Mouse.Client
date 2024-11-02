import React from 'react';
import { FlexProps, Spacer } from '@ui/Layout';

export interface CenterProps extends FlexProps {}
export const Center: React.FC<CenterProps> = (props) => {
  const {
    justify = 'center',
    align = 'center',
    direction = 'row',
    children,
    className,
    ...otherProps
  } = props;

  return (
    <Spacer
      justify={justify}
      align={align}
      className={className}
      direction={direction}
      {...otherProps}
    >
      {children}
    </Spacer>
  );
};
