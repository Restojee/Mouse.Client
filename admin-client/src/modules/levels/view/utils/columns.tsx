import { DataTreeColumnDef, TreeNode, editable, DefaultEditor } from '@ui/DataTreeTable';
import { LevelData } from '@/modules/levels/common/types';

export const getLevelColumns = (): DataTreeColumnDef<LevelData>[] => {
  return [
    {
      id: 'name',
      accessorFn: (row) => row.data.name,
      header: 'Название',
      size: 0.25,
      enableSorting: true,
      integrate: editable(DefaultEditor),
    },
    {
      id: 'description',
      accessorFn: (row) => row.data.description,
      header: 'Описание',
      size: 0.35,
      enableSorting: true,
      integrate: editable(DefaultEditor),
    },
    {
      id: 'image',
      accessorFn: (row) => row.data.image,
      header: 'Картинка',
      size: 0.15,
    },
    {
      id: 'createdUtcDate',
      accessorFn: (row) => row.data.createdUtcDate,
      header: 'Добавлена',
      size: 0.1,
    },
    {
      id: 'username',
      accessorFn: (row) => row.data.user?.username,
      header: 'Автор',
      size: 0.15,
    },
  ];
};
