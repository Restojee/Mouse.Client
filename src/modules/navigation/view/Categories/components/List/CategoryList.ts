import { CollectionProps } from "@ui/Collection/types";
import { CategoryItem } from "@/modules/navigation/view/Categories/common/types";
import { Category } from "@/modules/navigation/view/Categories";
import { CategoryItemMeta } from "@/modules/navigation/view/Categories/common/constants";
import Prop from "@common/hocs/withView/decorators/Prop";
import Computed from "@common/hocs/withView/decorators/Computed";
import OnWatch from "@common/hocs/withView/decorators/OnWatch";

class CategoryList {

  @Prop()
  private categories: CategoryItem[];

  @Computed()
  public get getCategoryItemProps(): CollectionProps {
    return {
      items: this.categories,
      itemKey: CategoryItemMeta.Title,
      Component: Category.Item
    }
  }

  @OnWatch<CategoryList>(viewModel => viewModel.categories)
  public handleCategoriesChange(prev: CategoryItem[], next: CategoryItem[]) {
    console.log('handleCategoriesChange', next)
  }
}

export default CategoryList;
