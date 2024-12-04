import cn from "clsx";
import { flexStyles as cls } from "@ui/Layout/ui/Flex/constants";
import * as React from "react";
import { calcPadding, calcSize } from "@ui/Layout/ui/Flex/utils";
import { FlexProps } from "@/common";

const useFlexStyles = (props: FlexProps) => {

  /* Root classes */
  const classes: string = cn(cls.core,
    props.justify && cls.justify[props.justify],
    props.align && cls.align[props.align],
    props.direction && cls.direction[props.direction],
    props.className
  );

  /* Root styles */
  const styles: Pick<React.CSSProperties, "width" | "height" | "gap"> =
    React.useMemo(
      () => ({
        padding: props.pa && calcPadding({ pa: props.pa }),
        width: props.width && calcSize(props.width),
        height: props.height && calcSize(props.height),
        gap: props.gap && calcSize(props.gap),
        ...props.styles,
      }),
      [props.gap, props.styles, props.width, props.height, props.pa]
    );

  return { styles, classes }
}

export default useFlexStyles;