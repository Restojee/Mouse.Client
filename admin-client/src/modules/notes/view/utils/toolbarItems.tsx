import React from 'react';
import type { TreeNode } from '@ui/DataTreeTable';
import { ToolbarElement } from '@ui/Toolbar';
import { ButtonDropDown } from '@common/components/ButtonDropDown';
import { Column, Row } from '@ui/Layout';
import { Typography } from '@ui/Typography';
import { IconWithInputText } from '@common/components/IconWithInputText';
import type { Note } from '@common/api/notes/models';
import UserFavoriteForm from '@/modules/users/modules/favorites/view/components/UserFavoriteForm';

export type NotesToolbarOptions = {
  selectedRows: TreeNode<Note>[];
  onDelete: (rows: TreeNode<Note>[]) => void;

  searchQuery?: string;
  onSearch?: (query: string) => void;

  formState?: { userId?: number; levelId?: number; description?: string };
  onFormUserChange?: (userId: number ) => void;
  onFormLevelChange?: (levelId: number ) => void;
  onFormDescriptionChange?: (description: string) => void;
  onCreate?: () => void;
  onFormCancel?: () => void;
};

export const getNotesToolbarItems = (opts: NotesToolbarOptions): ToolbarElement[] => {
  const items: ToolbarElement[] = [];

  const handleDelete = () => {
    opts.onDelete(opts.selectedRows);
  };

  items.push({
    id: 'add',
    align: 'left',
    component: (
      <ButtonDropDown icon="IconAdd" tooltip="Добавить заметку" buttonSize="md">
        <Column pa="md" gap="md">
          <Row>
            <Typography size="sm" fontWeight="bold">
              Форма добавления заметки
            </Typography>
          </Row>

          <UserFavoriteForm
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
