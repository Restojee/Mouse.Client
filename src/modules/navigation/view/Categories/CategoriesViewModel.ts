import { inject } from "inversify";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { Theme } from "@common/themes/core/Theme";
import { CategoriesViewProps } from "@/modules/navigation/view/Categories/types";
import ViewModelWithLifecycle from "@common/hocs/withView/ViewModelWithLifecycle";

class CategoriesViewModel extends ViewModelWithLifecycle<CategoriesViewProps, [Theme]> {
  constructor(@inject(ThemeInjectKey) private readonly theme: Theme) {
    super(theme);
    console.log(this.theme);
  }

  init() {
    console.log("Fetching user data for:", this.props.userId);
  }

  destroy() {
    console.log("Cleaning up for user:", this.props.userId);
  }

}

export default CategoriesViewModel;
