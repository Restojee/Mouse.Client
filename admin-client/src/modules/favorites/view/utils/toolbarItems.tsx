import React from 'react';
import type { TreeNode } from '@ui/DataTreeTable';
import { ToolbarElement } from '@ui/Toolbar';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { IconWithInputText } from '@common/components/IconWithInputText';
import type { Favorite } from '@common/api/favorites/models';

export type FavoritesToolbarOptions = {
  selectedRows: TreeNode<Favorite>[];
  onDelete: (rows: TreeNode<Favorite>[]) => void;

  searchQuery?: string;
  onSearch?: (query: string) => void;

  formState?: { userId?: number; levelId?: number };
  onFormUserChange?: (userId: number ) => void;
  onFormLevelChange?: (levelId: number ) => void;
  onCreate?: () => void;
  onFormCancel?: () => void;

  FormComponent: React.ComponentType<{
    mode: 'level' | 'user' | 'all';
    userId?: number;
    levelId?: number;
    onUserIdChange?: (value: number) => void;
    onLevelIdChange?: (value: number) => void;
    onSubmit: () => void;
    onCancel: () => void;
    disabled?: boolean;
  }>;
};

export const getFavoritesToolbarItems = (opts: FavoritesToolbarOptions): ToolbarElement[] => {
  const handleDelete = () => {
    opts.onDelete(opts.selectedRows);
  };

  const items: ToolbarElement[] = [];

  items.push({
    id: 'add',
    align: 'left',
    component: (
      <ButtonDropDown icon="IconAdd" tooltip="Добавить в избранное" buttonSize="md">
        <Column pa="md" gap="md">
          <Row>
            <Typography size="sm" fontWeight="bold">
              Форма добавления в избранное
            </Typography>
          </Row>

          <opts.FormComponent
            mode="all"
            userId={opts.formState?.userId}
            levelId={opts.formState?.levelId}
            onUserIdChange={opts.onFormUserChange as any}
            onLevelIdChange={opts.onFormLevelChange as any}
            onSubmit={opts.onCreate || (() => {})}
            onCancel={opts.onFormCancel || (() => {})}
          />
        </Column>
      </ButtonDropDown>
    ),
  });

  items.push({
    id: 'delete',
    icon: 'IconDelete',
    onClick: handleDelete,
    disabled: !opts.selectedRows || opts.selectedRows.length === 0,
    align: 'left',
  });

  items.push({
    id: 'divider-1',
    type: 'divider',
    align: 'left',
  });

  items.push({
    id: 'search',
    component: (
      <IconWithInputText
        icon="IconSearch"
        placeholder="Поиск..."
        size="md"
        value={opts.searchQuery}
        tooltip="Поиск"
        onChange={opts.onSearch}
        debounceDelay={500}
      />
    ),
    align: 'right',
  });

  return items;
};
