import withModule from "@common/hocs/withModule";
import NavigationContainer from "@/modules/navigation/view/NavigationContainer/NavigationContainer";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { Theme } from "@common/themes/core/Theme";
import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import { TagDataAccess } from "@/modules/tags/model/TagDataAccess";
import TagsApi from "@common/api/tags/api";
import {
  TagActionsInjectKey,
  TagDataAccessInjectKey,
  TagMapperInjectKey,
  TagsApiInjectKey,
} from "@/modules/tags/common/constants";
import TagContainerView from "@/modules/tags/view/Tags/TagContainer/TagContainer.view";
import { TagActions } from "@/modules/tags/model/TagActions";
import { TagMapper } from "@/modules/tags/common/mappers";
import { HttpConfigInjectKey, HttpHandlerInjectKey } from "@common/http/constants";
import { HttpHandler } from "@common/http/HttpHandler";
import HttpConfigService from "@common/http/HttpConfig";

export default withModule({
  key: 'TagModule',
  component: TagContainerView,
  providers: [
    {
      key: TagDataAccessInjectKey,
      provide: TagDataAccess,
    },
    {
      key: TagActionsInjectKey,
      provide: TagActions,
    },
    {
      key: TagMapperInjectKey,
      provide: TagMapper,
    },

    {
      // Глобально определить
      key: HttpConfigInjectKey,
      provide: HttpConfigService
    },
    {
      // Глобально определить
      key: HttpHandlerInjectKey,
      provide: HttpHandler
    },
    {
      // Глобально определить
      key: TagsApiInjectKey,
      provide: TagsApi
    },
    {
      // Глобально определить
      key: ThemeInjectKey,
      provide: Theme
    },
    {
      // Глобально определить
      key: HistoryServiceInjectKey,
      provide: HistoryService
    },
  ]
});
