import { type Http } from '@common/http/types';
import { Register } from "@common/utils/di/Register";

export const HttpInjectKey = 'HttpServiceInjectKey';

@Register(HttpInjectKey)
export class HttpHandler implements Http.ClientHandler {

  private static readonly Methods: Record<string, string> = {
    GET: 'GET',
    DELETE: 'DELETE',
    POST: 'POST',
    PUT: 'PUT',
  };

  private static readonly Headers: Record<string, string> = {
    Authorization: 'Authorization',
    ContentType: 'Content-Type',
  };

  private static readonly Bearer = 'Bearer ';
  private static readonly applicationJson = 'application/json';

  private static getUrlWithQuery = (url: string, query: string) => `${url}?${query}`;
  private static  getEndpointPath = (url: string, endpoint: string) => `${url}/${endpoint}`

  private readonly url: string = '';
  private readonly getToken: () => string = () => '';

  private getDefaultHeaders(): Headers {
    const headers = new Headers();
    headers.set(HttpHandler.Headers.ContentType, HttpHandler.applicationJson);
    headers.set(HttpHandler.Headers.Authorization, this.getBearerToken());
    return headers;
  }

  constructor(url: string, getToken: () => string) {
    this.url = url;
    this.getToken = getToken;
  }

  private getBearerToken() {
    return `${HttpHandler.Bearer}${this.getToken()}`;
  }

  private getBodyParams<T extends {}>(options?: T): string {
    return JSON.stringify(options);
  }

  private getUrl(endpoint: string, query?: string) {
    let url = HttpHandler.getEndpointPath(this.url, endpoint);
    if (query) {
      url = HttpHandler.getUrlWithQuery(url, query);
    }
    return url;
  }

  private async getResponseData<R>(response: Response): Promise<R> {
    return await response.json();
  }

  private async call<T extends {}, R>(
    url: string,
    method: keyof typeof HttpHandler.Methods,
    body?: T,
  ): Promise<R> {
    const response = await fetch(url, {
      method,
      headers: this.getDefaultHeaders(),
      body: this.getBodyParams(body),
    });
    return await this.getResponseData<R>(response);
  }

  public async get<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    const query = new URLSearchParams(options.params).toString();
    const urlWithParams = `${this.getUrl(options.url)}?${query}`;
    return this.call(urlWithParams, HttpHandler.Methods.PUT);
  }

  public async post<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    return this.call(options.url, HttpHandler.Methods.POST, options.params);
  }

  public async put<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    return this.call(options.url, HttpHandler.Methods.PUT, options.params);
  }

  public async delete<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    const query = new URLSearchParams(options.params).toString();
    const urlWithParams = this.getUrl(options.url, query);
    return this.call(urlWithParams, HttpHandler.Methods.POST);
  }
}
