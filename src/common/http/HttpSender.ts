import { MethodTypes } from "@common/services/modal/common/constants";
import HttpHeaders from "@common/http/HttpHeaders";

class HttpSender {

  constructor(private readonly httpHeaders: HttpHeaders,) {}

  private async getResponseData<R>(response: Response): Promise<R> {
    return await response.json();
  }

  private getBodyParams<T extends {}>(options?: T): string {
    return JSON.stringify(options);
  }

  public async call<T extends {}, R>(
    url: string,
    method: keyof typeof MethodTypes,
    body?: T,
  ): Promise<R> {
    const response = await fetch(url, {
      method,
      headers: this.httpHeaders.getDefaultHeaders(),
      body: this.getBodyParams(body),
    });
    return await this.getResponseData<R>(response);
  }

}

export default HttpSender;
