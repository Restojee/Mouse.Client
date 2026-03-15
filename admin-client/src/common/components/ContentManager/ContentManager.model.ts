import React from 'react';
import { inject } from 'inversify';
import { Action, Computed, State, OnMounted, OnWatch } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { AppService } from '@common/services/app';
import type { PaginationService, AsyncPaginationService, PaginationState } from '@common/services/pagination';
import { SortingService } from '@common/services/sorting/SortingService';
import { SortDirection } from '@common/types/sorting';
import { ToolbarElement } from '@ui/Toolbar';
import type { TreeNode } from '@ui/DataTreeTable/types';
import { 
  AppServiceInjectKey,
  PaginationServiceInjectKey,
  AsyncPaginationServiceInjectKey,
  SortingServiceInjectKey 
} from '@/constants';
import { RowType } from '@common/store/entity/EntityManager';

export interface PaginationResponse {
  totalItems: number;
  totalPages: number,
  pageSize: number,
  page: number
  data: unknown[]
}

export interface ContentManagerContext {
  pageIndex: number;
  pageSize: number;
  reloadData: () => Promise<void>;
}

export interface ContentManagerRef {
  reloadData: () => Promise<void>;
}

export interface FilterConfig {
  id: string;
  component: React.ReactNode;
}

export interface ContentManagerProps<TData extends { id: RowType } = { id: RowType }> {
  contentElements: TData[];
  title?: string;
  columns: any[];
  toolbarItems?: ToolbarElement[];
  filters?: FilterConfig[];
  entityToTreeNode: (entity: TData) => TreeNode<TData>;
  onCellEdit?: (rowId: RowType, columnId: string, value: unknown, rowData: TData) => Promise<void>;
  onPageLoad?: (page: number, pageSize: number) => Promise<PaginationResponse>;
  onDelete?: (items: TreeNode<TData>[]) => void;
  useAsyncPagination?: boolean;
  dataKey: string;
  selectedRows?: TreeNode<TData>[];
  selectedRowId?: string | number ;
  onRowSelect?: (row: TreeNode<TData> ) => void;
  onRowCheck?: (rows: TreeNode<TData>[]) => void;
  setContentManagerRef?: (ref: ContentManagerRef) => void;
  enableSorting?: boolean;
}

class ContentManagerViewModel<TData extends { id: RowType } = { id: RowType }> extends ViewModel<ContentManagerProps<TData>> {
  @State() private _searchQuery: string = '';
  @State() public filtersVisible: boolean = false;
  @State() private pagination: PaginationState = {
    pageIndex: 0,
    pageSize: 50,
    totalItems: 0
  };

  constructor(
    @inject(AppServiceInjectKey) private appService: AppService,
    @inject(PaginationServiceInjectKey) private paginationService: PaginationService,
    @inject(AsyncPaginationServiceInjectKey) private asyncPagination: AsyncPaginationService<TreeNode<TData>>,
    @inject(SortingServiceInjectKey) private sortingService?: SortingService<TreeNode<TData>>
  ) {
    super();
  }

  @OnMounted()
  async onMount() {
    if (this.props.title) {
      this.appService.setPageTitle(this.props.title);
    }

    this.paginationService.setPagination(this.pagination);
    this.asyncPagination.setPagination(this.pagination);

    if (this.props.filters && this.props.filters.length > 0) {
      this.filtersVisible = true;
    }

    if (this.props.onPageLoad) {
      this.asyncPagination.setPageLoadHandler(this.props.onPageLoad)
      return;
    }
  }

  @OnWatch<ContentManagerViewModel>(vm => vm.reloadData)
  public onChangeReloadData() {
    this.props.setContentManagerRef?.({
      reloadData: this.reloadData,
    })
  }

  @OnWatch<ContentManagerViewModel>(vm => vm.props.enableSorting)
  protected watchSortingProps(enableSorting: boolean) {
    if (enableSorting) {
      this.sortingService?.setLocalSorting();
      this.sortingService?.setSortConfig('id', SortDirection.DESC);
    }
  }

  @OnWatch<ContentManagerViewModel>(vm => vm.props.contentElements)
  public sync(){
    if (!this.props.onPageLoad) {
      const sortedData = this.sortingService.sortLocal(this.getTreeNodes);
      this.paginationService.setData(sortedData);
    }
  }

  @Computed()
  public get dataKey(): string {
    return this.props.dataKey || 'id';
  }

  @Computed()
  public get columns(): any[] {
    return this.props.columns || [];
  }

  @Action()
  public onCellEdit = async (rowId: RowType, columnId: string, value: unknown, rowData: TData) => {
    if (!this.props.onCellEdit) {
      return undefined;
    }

    await this.props.onCellEdit(rowId, columnId, value, rowData);
  }

  @Computed()
  public get getTreeNodes(): TreeNode<TData>[] {
    return this.props.contentElements.map(this.props.entityToTreeNode);
  }

  @Computed()
  public get getSelectedRows(): TreeNode<TData>[] {
    return this.props.selectedRows;
  }

  @Computed()
  public get getDisplayData(): TreeNode<TData>[] {
    if (this.props.onPageLoad) {
      return this.getTreeNodes;
    }
    return this.paginationService.getPageData;
  }

  @Action()
  public toggleFilters = (): void => {
    this.filtersVisible = !this.filtersVisible;
  }

  @Computed()
  public get getComputedToolbarItems(): ToolbarElement[] {
    const items = this.props.toolbarItems;

    if (this.props.filters && this.props.filters.length > 0) {
      items.push({
        id: 'toggle-filters',
        icon: 'IconFilter',
        onClick: this.toggleFilters,
        tooltip: this.filtersVisible ? 'Скрыть фильтры' : 'Показать фильтры',
        align: 'right',
        isActive: this.filtersVisible,
      });
    }
    
    return items;
  }

  @Computed()
  public get getHasSelectedRows(): boolean {
    return this.props.selectedRows.length > 0;
  }

  @Computed()
  public get getSelectedRowsCount(): number {
    return (this.props.selectedRows || []).length;
  }

  @Computed()
  public get getPaginationConfig() {
    if (this.props.onPageLoad) {
      return this.asyncPagination.paginationConfig;
    }
    return this.paginationService.paginationConfig;
  }

  @Computed()
  public get getPaginationCallbacks() {
    if (this.props.onPageLoad) {
      return this.asyncPagination.getPaginationCallbacks;
    }
    return this.paginationService.getPaginationCallbacks;
  }

  @Computed()
  public get getSortField(): string {
    return this.sortingService?.sortField;
  }

  @Computed()
  public get getSortDirection(): SortDirection  {
    return this.sortingService?.sortDirection;
  }

  @Action()
  public handleSort = (field: string, direction: SortDirection ): void => {
    if (!this.sortingService || this.props.onPageLoad) return;
    
    if (!field || direction === null) {
      this.sortingService.clearSort();
    } else {
      this.sortingService.setSortConfig(field, direction);
    }

    const sortedData = this.sortingService.sortLocal(this.getTreeNodes);
    this.paginationService.setData(sortedData);
  }

  @Action()
  public handleRowSelect = (row: TreeNode<TData> ): void => {
    this.props.onRowSelect?.(row);
  }

  @Action()
  public handleRowCheck = (rows: TreeNode<TData>[]): void => {
    this.props.onRowCheck?.(rows);
  }

  @Action()
  public clearSelection = (): void => {
    this.props.onRowCheck?.([]);
    this.appService.closeRightSidebar();
  }

  @Action()
  public reloadData = async (): Promise<void> => {
    await this.asyncPagination.loadPage(this.asyncPagination.paginationConfig.currentPage);
  }

  @Action()
  public handleRowExpand = (expandedIds: Set<string | number>): void => {
    console.log('Развернутые строки:', Array.from(expandedIds));
  }

  @Action()
  public handleRowDelete = (rows: TreeNode<TData>[]): void => {

  }
}
export default ContentManagerViewModel;
