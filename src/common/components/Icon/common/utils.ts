import { EIcon } from '@ui/Icon/common/types';

export const getIconPath = (icon: EIcon | string | undefined) => {
  return '/resources/' + icon;
}