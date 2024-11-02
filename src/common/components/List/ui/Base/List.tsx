import React, { MouseEvent } from 'react';
import { ListItem } from '@ui/List/ui/Item/ListItem';
import { type ListProps } from '@ui/List/common/types';
import { Stack } from '@ui/Layout';
import { type ListItemOptions } from '@ui/Select/common/types';

const List = (props: ListProps) => {
  const { onChange, options, emptyMessage, className } = props;

  const handleClick = React.useCallback(
    (option: ListItemOptions) => {
      return () => {
        onChange?.(option)
      }
    },
    [onChange],
  );

  const isSelected = false;

  const renderOptions = React.useMemo(
    () =>
      options?.map((option) => (
        <ListItem
          key={option.value}
          label={option.label}
          leftIcons={option.leftIcons}
          leftIcon={option.leftIcon}
          rightIcons={option.rightIcons}
          rightIcon={option.rightIcon}
          onClick={handleClick(option)}
          isSelected={isSelected}
        />
      )),
    [options, handleClick, isSelected],
  );

  return (
    <Stack orientation="vertical" className={className}>
      {renderOptions?.length ? renderOptions : emptyMessage}
    </Stack>
  );
};

export default List;
