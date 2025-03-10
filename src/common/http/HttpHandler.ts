import {
  MethodTypes,
} from "@common/services/modal/common/constants";
import { getEndpointPath, getUrlWithQuery } from "@common/services/modal/common/utils";
import { inject, injectable } from "inversify";
import HttpConfigService from "@common/http/HttpConfig";
import HttpSender from "@common/http/HttpSender";
import HttpHeaders from "@common/http/HttpHeaders";
import { HttpConfigInjectKey } from "@common/http/constants";
import { Http } from "@common/http/types";

@injectable()
export class HttpHandler implements Http.ClientHandler {

  private readonly config: Http.HttpConfig = this.configService.getConfig();
  private readonly httpHeaders: HttpHeaders = new HttpHeaders(this.config.getToken);
  private readonly httpSender: HttpSender = new HttpSender(this.httpHeaders);

  constructor(
    @inject(HttpConfigInjectKey) private configService: HttpConfigService,
  ) {}

  private getUrl(endpoint: string, query?: string) {
    let url = getEndpointPath(this.config.url, endpoint);
    query && (url = getUrlWithQuery(url, query));
    return url;
  }

  public async get<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    const query = new URLSearchParams(options.params).toString();
    const urlWithParams = `${this.getUrl(options.url)}?${query}`;
    return this.httpSender.call(urlWithParams, MethodTypes.PUT);
  }

  public async post<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    return this.httpSender.call(options.url, MethodTypes.POST, options.params);
  }

  public async put<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    return this.httpSender.call(options.url, MethodTypes.PUT, options.params);
  }

  public async delete<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    const query = new URLSearchParams(options.params).toString();
    const urlWithParams = this.getUrl(options.url, query);
    return this.httpSender.call(urlWithParams, MethodTypes.POST);
  }
}
