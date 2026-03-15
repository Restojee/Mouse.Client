import { inject } from 'inversify';
import { Action, AsyncAction, Computed, OnMounted, OnUnmounted, State } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { TagDataAccess, TagActions, TagDataAccessInjectKey, TagActionsInjectKey } from '@/modules/tags/model/services';
import { createTagsToolbarItems, getTagColumns } from '@/modules/tags/view/utils';
import type { TagData, TagFormData } from '@/modules/tags/model/entities';
import { Notification } from '@ui/Notification';
import { showConfirm } from '@ui/Modal';
import type { TreeNode } from '@ui/DataTreeTable';
import { TagsProps } from '@/modules/tags/view/components/Tags';
import { ColumnDef } from '@tanstack/react-table';
import { AppService } from '@common/services/app';
import { AppServiceInjectKey } from '@/constants';

class TagsModel extends ViewModel<TagsProps> {

  @State()
  public title = 'Управление тегами';

  @State()
  public selectedRows: TreeNode<TagData>[] = [];

  @State()
  public selectedRowId: string | number  = null;

  @State()
  public searchQuery: string = '';

  constructor(
    @inject(TagDataAccessInjectKey) public dataAccess: TagDataAccess,
    @inject(TagActionsInjectKey) public actions: TagActions,
    @inject(AppServiceInjectKey) private appService: AppService,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns(): ColumnDef<TreeNode<TagData>>[] {
    return getTagColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return createTagsToolbarItems({
      formState: this.dataAccess.tagFormData,
      selectedRows: this.selectedRows,
      onAdd: this.handleCreateTag.bind(this),
      onEdit: this.handleEdit.bind(this),
      onDelete: this.handleDelete.bind(this),
      onSearch: this.handleSearch.bind(this),
      onFormCancel: this.handleFormCancel.bind(this),
      onFormNameChange: (value) => this.handleFormFieldChange.call(this, 'name', value),
      onFormDescriptionChange: (value) => this.handleFormFieldChange.call(this, 'description', value),
    });
  }

  @Action()
  public handleSearch(query: string): void {
    this.searchQuery = query;
  }

  public entityToTreeNode = (tag: TagData) => {
    return { id: tag.id, data: tag };
  }

  @OnMounted()
  @AsyncAction()
  public async loadTags(): Promise<void> {
    await this.actions.loadTags();
  }

  @Action()
  public handleRowSelect = (row: TreeNode<TagData> | null): void => {
    if (row) {
      this.selectedRowId = row.id;
    } else {
      this.selectedRowId = null;
    }
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<TagData>[]): void => {
    this.selectedRows = rows;
  }

  @Action()
  public handleFormFieldChange(field: keyof TagFormData, value: string): void {
    this.dataAccess.tagFormData[field] = value;
  }

  @Action()
  public handleFormCancel(): void {
    this.dataAccess.tagFormData.name = '';
    this.dataAccess.tagFormData.description = '';
  }

  @AsyncAction()
  public async handleCreateTag(): Promise<void> {
    const { name, description } = this.dataAccess.tagFormData
    await this.actions.createTag({ name, description });
    Notification.success('Успех', 'Тег добавлен')
    this.handleFormCancel();
  }

  @AsyncAction()
  public async handleEdit(): Promise<void> {
    
  }

  @AsyncAction()
  async performDelete(tags: TreeNode<TagData>[]): Promise<void> {
    await this.actions.deleteSelectedTags(tags);
    Notification.success('Успех', 'Теги удалены');
  }

  async handleDelete(tags: TreeNode<TagData>[]): Promise<void> {
    console.log(tags)
    if (!tags || !tags.length) {
      Notification.warning('Предупреждение', 'Не выбрано ни одного тега');
      return;
    }

    const count = tags.length;
    const text = count === 1
      ? 'Вы уверены, что хотите удалить выбранный тег?'
      : `Вы уверены, что хотите удалить ${count} тег(ов)?`;

    showConfirm('Подтверждение удаления', {
      text,
      size: 'md',
      onSuccess: () => this.performDelete(tags)
    });
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: string): Promise<void> {
    await this.actions.updateTag(rowId, { [columnId]: value });
  }

  @Computed()
  public get tagCollection() {
    const tags = this.dataAccess.entityManager.getCollection;
    if (!this.searchQuery) {
      return tags;
    }

    const query = this.searchQuery.toLowerCase();
    return tags.filter(tag =>
      tag.name?.toLowerCase().includes(query) ||
      tag.description?.toLowerCase().includes(query)
    );
  }

  @OnUnmounted()
  public cleanup(): void {
    this.appService.closeRightSidebar();
  }
}

export default TagsModel;
