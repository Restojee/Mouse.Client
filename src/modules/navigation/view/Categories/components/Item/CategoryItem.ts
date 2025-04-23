import ViewModel from "@common/hocs/withView/ViewModel";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";
import OnWatch from "@common/hocs/withView/decorators/OnWatch";
import Prop from "@common/hocs/withView/decorators/Prop";
import State from "@common/hocs/withView/decorators/State";
import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/common/types";

class CategoryItem extends ViewModel<CategoryItemViewProps> {
  @Prop()
  public id: string;

  @Prop()
  public title: string;

  @Prop()
  public icon: string;

  @Prop()
  public caption?: string;

  @State()
  public search?: string;

  @OnMounted()
  public handleMounted() {
    console.log('handleMounted')
  }

  @OnWatch<CategoryItem>(viewModel => viewModel.icon)
  protected handleIconChange(next: string, prev: string) {
    console.log('handleIconChange', prev, next)
  }
}

export default CategoryItem;
