import { CSSProperties, ElementType, ReactNode } from "react";

const style: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

type VisuallyHiddenProps = {
  as?: ElementType;
  children: ReactNode;
};

export const VisuallyHidden = ({ as: Tag = "span", children }: VisuallyHiddenProps) => {
  return <Tag style={style}>{children}</Tag>;
};
