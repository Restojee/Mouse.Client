import { injectable } from 'inversify';
import HttpConfig = Http.HttpConfig;
import { Http } from "@common/http/types";

@injectable()
class HttpConfigService {
  private config: HttpConfig = {
    url: 'https://api.onlyplanks.fun',
    getToken: () => '',
  };

  getConfig(): HttpConfig {
    return this.config;
  }

  setConfig(config: HttpConfig): void {
    this.config = config;
  }
}

export default HttpConfigService;
