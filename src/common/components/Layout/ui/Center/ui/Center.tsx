import React from 'react';
import { FlexProps, Spacer } from '@ui/Layout';

export interface CenterProps extends Omit<FlexProps, "align" | "justify"> {}
const Center: React.FC<CenterProps> = (props) => {
  const {
    direction = 'row',
    children,
    className,
    ...otherProps
  } = props;

  return (
    <Spacer
      className={className}
      direction={direction}
      {...direction === "column" && { align: "center" }}
      {...direction === "row" && { justify: "center" }}
      {...otherProps}
    >
      {children}
    </Spacer>
  );
};

export default React.memo(Center);
