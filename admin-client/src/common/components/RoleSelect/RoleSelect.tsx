import React from 'react';
import { Select } from '@common/components/Combobox/Select';
import { type ListItemOptions } from '@ui/Select/common/types';

export interface RoleSelectProps {
  value?: any;
  onChange?: (value: any) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
}

const ROLE_OPTIONS: ListItemOptions[] = [
  { label: 'Пользователь', value: 'user' },
  { label: 'Модератор', value: 'moder' },
  { label: 'Администратор', value: 'admin' },
  { label: 'Только чтение', value: 'readonly' },
  { label: 'Системный администратор', value: 'system_admin' },
];

export const RoleSelect: React.FC<RoleSelectProps> = ({
  value,
  onChange,
  size = 'md',
  disabled = false,
  nonIntegration,
  integrated,
}) => {
  const handleChange = React.useCallback(
    (option: ListItemOptions) => {
      onChange?.(option.value);
    },
    [onChange]
  );

  return (
    <Select
      options={ROLE_OPTIONS}
      value={value}
      onChange={handleChange}
      size={size}
      disabled={disabled}
      nonIntegration={nonIntegration}
      integrated={integrated}
      allowClear={false}
    />
  );
};

export default RoleSelect;
