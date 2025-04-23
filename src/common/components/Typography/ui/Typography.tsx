import * as React from "react";
import { TextTags } from "@common/constants/textTags";
import { TypographyProps } from "@ui/Typography/common/types";
import { classByThemeSize, rootClass } from "@ui/Typography/common/constants";
import withAutoClasses, { WithAutoClassProps } from "@common/hooks/useAutoClasses";

import "./Typography.scss";

const Typography: React.FC<WithAutoClassProps<TypographyProps>> = (props) => {
  const {
    color = 'paletteColorsSecondary',
    children,
    tag,
    autoClasses,
    href,
    onClick,
  } = props;

  const Component = tag || TextTags.Span;

  return (
    <Component className={`${autoClasses} ${color}`} href={href} onClick={onClick}>
      {children}
    </Component>
  );
};

export default withAutoClasses(Typography, {
  bindings: [
    'ellipsis',
    'cantSelect',
    'clickable',
    'upperCase',
    'link',
    ['fontSize', classByThemeSize]
  ],
  root: rootClass,
});
