import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { CollectionProps } from "@ui/Collection/types";
import { CategoryListViewProps } from "@/modules/navigation/view/Categories/common/types";
import { Category } from "@/modules/navigation/view/Categories";
import { CategoryItemMeta } from "@/modules/navigation/view/Categories/common/constants";

class CategoryListViewModel extends ViewModelWithLifecycle<CategoryListViewProps> {
  public getCategoryItemProps(): CollectionProps {
    return {
      items: this.getProps().categories,
      itemKey: CategoryItemMeta.Title,
      Component: Category.Item
    }
  }
}

export default CategoryListViewModel;
