export interface CategoryItem {
  title: string;
  caption?: string;
}

type CategoryMainOptions = Pick<CategoryItem, 'title' | 'caption'>;
interface CategoryMainProps {
  isCompact?: boolean;
}

export interface CategoryListViewProps extends CategoryMainProps{
  categories?: CategoryItem[];
}

export interface CategoryItemViewProps
  extends CategoryMainOptions, CategoryMainProps {}
