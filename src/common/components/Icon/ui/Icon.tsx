import { getIconPath } from '@ui/Icon/common/utils';
import { IconProps } from '@ui/Icon/common/types';

export const Icon = (props: IconProps) => {

  const { icon } = props;

  return <img src={getIconPath(icon)} alt={icon?.toString()} />
}