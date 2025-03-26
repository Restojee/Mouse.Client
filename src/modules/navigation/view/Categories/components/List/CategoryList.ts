import ViewModel from "@common/hocs/withView/ViewModel";
import { CollectionProps } from "@ui/Collection/types";
import { CategoryItem, CategoryListViewProps } from "@/modules/navigation/view/Categories/common/types";
import { Category } from "@/modules/navigation/view/Categories";
import { CategoryItemMeta } from "@/modules/navigation/view/Categories/common/constants";
import Prop from "@common/hocs/withView/decorators/Prop";

class CategoryList extends ViewModel<CategoryListViewProps> {

  @Prop() categories: CategoryItem[];

  public getCategoryItemProps(): CollectionProps {
    return {
      items: this.categories,
      itemKey: CategoryItemMeta.Title,
      Component: Category.Item
    }
  }
}

export default CategoryList;
