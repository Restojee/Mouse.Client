import { IconProps } from '@ui/Icon/common/types';
import * as React from "react";
import { Suspense } from "react";

export type IconComponent = React.FC<IconProps>;
export const Icon: IconComponent = (props) => {

  const { color = "paletteIconNormal", icon } = props;

  const LazyIcon: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>> = React.lazy(() =>
    import(`/src/resources/icons/${icon}.svg`).then((module) => ({
      default: module.ReactComponent,
    }))
  );

  return (
    <Suspense fallback={null}>
      <LazyIcon {...props} className={color} />
    </Suspense>
  );
}
