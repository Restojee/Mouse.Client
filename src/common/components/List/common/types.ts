import { type ListItemOptions } from '@ui/Select/common/types';

export interface ListProps {
  options?: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  emptyMessage?: string;
  className?: string;
}
