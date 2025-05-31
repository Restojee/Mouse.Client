import withModule from "@common/hocs/withModule";
import NavigationContainer from "@/modules/navigation/view/NavigationContainer/NavigationContainer";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { Theme } from "@common/themes/core/Theme";
import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import { IntlService, IntlServiceInjectKey } from "@common/services/intl";

export default withModule({
  key: 'NavigationModule',
  component: NavigationContainer,
  providers: [
    {
      key: NavigationDataAccessInjectKey,
      provide: NavigationDataAccess,
    },
  ]
});
