import React from 'react';
import { AsyncSelect } from '@ui/InfiniteScrollSelect/AsyncSelect';
import { ThemeSizes } from '@common/themes/common/types';
import UserSelectViewModel from './UserSelectView.model';

export interface UserSelectViewProps {
  value?: number;
  onChange?: (userId: number) => void;
  onBlur?: () => void;
  placeholder?: string;
  size?: ThemeSizes;
  disabled?: boolean;
  append?: React.ReactNode;
  leftIcon?: string;
  nonIntegration?: boolean;
  integrated?: boolean;
  noBorder?: boolean;
  noPadding?: boolean;
  noHover?: boolean;
  viewModel: UserSelectViewModel;
}

const UserSelectView: React.FC<UserSelectViewProps> = ({ viewModel }) => {
  const selectedOption = viewModel.options.find(opt => opt.value === viewModel.props.value);
  const displayValue = typeof selectedOption?.label === 'string' ? selectedOption.label : '';

  return (
    <AsyncSelect
      options={viewModel.options}
      onChange={viewModel.handleChange}
      displayValue={displayValue}
      placeholder={viewModel.placeholder}
      size={viewModel.props.size || 'md'}
      disabled={viewModel.isDisabled}
      append={viewModel.props.append}
      leftIcon={viewModel.props.leftIcon}
      nonIntegration={viewModel.props.nonIntegration}
      integrated={viewModel.props.integrated}
      noBorder={viewModel.props.noBorder}
      noPadding={viewModel.props.noPadding}
      noHover={viewModel.props.noHover}
      onBlur={viewModel.props.onBlur}
      onSearchChange={viewModel.handleSearchChange}
      onLoadMore={() => viewModel.loadNextPage()}
      hasMore={viewModel.hasMore}
      isLoadingMore={viewModel.isLoadingMore}
      rightIcon={viewModel.props.append ? undefined : "IconChevronDown"}
    />
  );
};

export default UserSelectView;
