import React from 'react';
import { Icon } from '@common/components/Icon';
import styles from './ButtonIcon.module.scss';
import { ThemeSizes } from '@common/themes/common/types';

interface ButtonIconProps {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
  className?: string;
  size: ThemeSizes;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  tooltip,
  disabled = false,
  className,
  size
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      title={tooltip}
      disabled={disabled}
      type="button"
    >
      <Icon icon={icon} size={size} />
    </button>
  );
};
