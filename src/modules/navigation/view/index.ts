import withModule from "@common/hocs/withModule";
import NavigationContainer from "@/modules/navigation/view/NavigationContainer/NavigationContainer.view";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { Theme } from "@common/themes/core/Theme";

export default withModule({
  key: 'NavigationModule',
  component: NavigationContainer,
  providers: [
    {
      key: NavigationDataAccessInjectKey,
      provide: NavigationDataAccess
    },
    {
      // Глобально определить
      key: ThemeInjectKey,
      provide: Theme
    },
  ]
});
