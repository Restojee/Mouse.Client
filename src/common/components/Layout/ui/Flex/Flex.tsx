import * as React from 'react';
import { FlexProps } from '@ui/Layout/ui/Flex/types';
import { PropsWithChildren } from "react";
import useFlexStyles from "@ui/Layout/ui/Flex/useFlexStyles";
import './Flex.scss';

const Flex: React.FC<PropsWithChildren<FlexProps>> = (props) => {

  const Element = props.element;
  const flexStyles = useFlexStyles(props);

  /* Html element by props.element */
  return (
    <Element className={flexStyles.classes} style={flexStyles.styles}>
      {props.children}
    </Element>
  );
};

Flex.defaultProps = {
  justify: 'center',
  align: 'start',
  direction: 'row',
  element: 'div',
}

export default React.memo(Flex);
