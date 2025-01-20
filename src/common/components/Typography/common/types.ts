import * as React from "react";
import { TextTags } from "@common/constants/textTags";
import { TextColorKey } from "@common/themes/common/types";

export interface TypographyProps {
  fontSize?: number | string;
  ellipsis?: boolean;
  upperCase?: boolean;
  link?: boolean;
  clickable?: boolean;
  cantSelect?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: string;
  opacity?: number;
  tag?: TextTags;
  color?: TextColorKey;
}