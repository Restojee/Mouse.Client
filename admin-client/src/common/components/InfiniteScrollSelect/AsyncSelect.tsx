import React, { useState } from 'react';
import { Combobox } from '@common/components/Combobox/Combobox';
import { InputText } from '@ui/Input/ui/InputText/InputText';
import { type ListItemOptions } from '@ui/Select/common/types';
import { ThemeSizes } from '@common/themes/common/types';
import { PopupPosition } from '@ui/Popup';
import { InfiniteScrollList } from '@common/components/InfiniteScrollList';

interface InfiniteScrollSelectProps {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  placeholder?: string;
  size?: ThemeSizes;
  disabled?: boolean;
  displayValue: string;
  value?: any;
  allowClear?: boolean;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  rightIcon?: string;
  append?: React.ReactNode;
  leftIcon?: string;
  onBlur?: () => void;
  onSearchChange?: (value: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export const AsyncSelect: React.FC<InfiniteScrollSelectProps> = ({
  options,
  onChange,
  placeholder = 'Выберите...',
  size = 'md',
  disabled = false,
  displayValue,
  value,
  allowClear = false,
  nonIntegration = false,
  integrated = false,
  noBorder = false,
  noPadding = false,
  noHover = false,
  rightIcon,
  append,
  leftIcon,
  onBlur,
  onSearchChange,
  onLoadMore,
  hasMore,
  isLoadingMore,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOptionChange = (option: ListItemOptions) => {
    onChange?.(option);
    setIsOpen(false);
  };

  const optionsWithSelection: ListItemOptions[] = React.useMemo(() => {
    const base = options.map((opt) => ({
      ...opt,
      isSelected: opt.value === value,
    }));

    if (!allowClear) {
      return base;
    }

    return [
      { label: 'Не выбрано', value: undefined, isSelected: value === undefined },
      ...base,
    ];
  }, [options, value, allowClear]);

  return (
    <Combobox
      trigger={
        <InputText
          onClick={handleInputClick}
          onBlur={onBlur}
          value={displayValue}
          placeholder={placeholder}
          size={size}
          nonIntegration={nonIntegration}
          integrated={integrated}
          noBorder={noBorder}
          noPadding={noPadding}
          noHover={noHover}
          rightIcon="IconChevronDown"
          append={append}
          leftIcon={leftIcon}
          readOnly={true}
        />
      }
      content={
        <InfiniteScrollList
          options={optionsWithSelection}
          onChange={handleOptionChange}
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          isLoading={isLoadingMore}
          size={size}
          showSearch={true}
          onSearch={onSearchChange}
        />
      }
      isOpen={isOpen}
      onClose={handleClose}
      position={PopupPosition.BOTTOM}
      size={size}
    />
  );
};

export default AsyncSelect;
