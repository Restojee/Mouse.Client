import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";

class CategoryItemViewModel extends ViewModelWithLifecycle<CategoryItemViewProps> {
  public getIcon(): string {
    return this.getProps().icon;
  }
  public getTitle(): string {
    return this.getProps().title
  }
}

export default CategoryItemViewModel;
