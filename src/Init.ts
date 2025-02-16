import { DIContainer } from "@common/utils/di";
import Services, { ServicesInjectKey } from "@common/services";

class AppServices {
  public static init() {
    const container = new DIContainer();
    container.register(ServicesInjectKey, Services);
  }
}

export default AppServices;

