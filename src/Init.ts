import { AppModuleInjectKey } from "@common/services";
import { Instance } from "@common/instances/Instance";

class AppServices {
  public static init() {
    Instance.add(AppModuleInjectKey)
  }
}

export default AppServices;

