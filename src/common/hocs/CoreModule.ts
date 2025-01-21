import { Instance } from "@common/instances/Instance";
import { AppInstance } from "@common/instances";

class CoreModule {
  public readonly appInstance: Instance = AppInstance;
}

export default CoreModule;