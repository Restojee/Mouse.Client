import React from "react";
import { Property } from "csstype";
import styles from "./ImageForm.module.scss";

type ImageFormContainerPropsType = {
  image: string | null;
  isDrag: boolean;
  width?: Property.Width<number>;
  height?: Property.Height<number>;
};
export const ImageFormContainer = React.forwardRef<
  HTMLDivElement,
  ImageFormContainerPropsType & React.HTMLAttributes<HTMLDivElement>
>(({ image, isDrag, width, height, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={[styles.container, isDrag && styles.containerDrag, className].filter(Boolean).join(" ")}
    style={{
      height: height || 120,
      backgroundImage: image ? `url(${image})` : undefined,
      width,
      ...style,
    }}
    {...props}
  />
));
ImageFormContainer.displayName = "ImageFormContainer";

export const ImageFormLink = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={[styles.link, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
ImageFormLink.displayName = "ImageFormLink";

export const ImageHover = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={[styles.hover, className].filter(Boolean).join(" ")}
      {...props}
    />
  ),
);
ImageHover.displayName = "ImageHover";
