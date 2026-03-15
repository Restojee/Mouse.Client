import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { Comment } from '@common/api/comments/models';

export const getLevelCommentsColumns = (): DataTreeColumnDef<Comment>[] => ([
  {
    id: 'username',
    accessorFn: row => row.data.user.username,
    header: 'Пользователь',
    size: 0.2,
  },
  {
    id: 'text',
    accessorFn: row => row.data.text,
    header: 'Текст комментария',
    size: 0.6,
    integrate: editable(DefaultEditor),
  },
  {
    id: 'createdUtcDate',
    accessorFn: row => row.data.createdUtcDate,
    header: 'Создано',
    size: 0.2,
  },
]);
