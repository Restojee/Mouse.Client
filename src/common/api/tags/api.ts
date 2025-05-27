import { TagEndpoints, TagUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import {
  type TagCollectArgs,
  type TagCollectResponse,
  type TagCreateArgs,
  type TagCreateResponse,
  type TagRemoveArgs, TagRemoveResponse,
  type TagUpdateArgs,
  type TagUpdateResponse,
} from "./types";
import { inject, injectable } from "inversify";
import { HttpHandlerInjectKey } from "@common/http/constants";

@injectable()
class TagsApi {

  public static GlobalInjectKey = 'TagsApiKey';
  private readonly http: HttpHandler;

  constructor(@inject(HttpHandlerInjectKey) httpHandler: HttpHandler) {
    this.http = httpHandler;
  }

  public collect(): Promise<TagCollectResponse> {
    return this.http.get<TagCollectArgs, TagCollectResponse>({
      url: TagUrls[TagEndpoints.Collect],
    })
  }

  public create(args: TagCreateArgs): Promise<TagCreateResponse> {
    return this.http.put<TagCreateArgs, TagCreateResponse>({
      url: TagUrls[TagEndpoints.Create],
      params: args,
    })
  }

  public update(args: TagUpdateArgs): Promise<TagUpdateResponse> {
    return this.http.put<TagUpdateArgs, TagUpdateResponse>({
      url: TagUrls[TagEndpoints.Update],
      params: args,
    })
  }

  public remove(args: TagRemoveArgs): Promise<TagRemoveResponse> {
    return this.http.delete<TagRemoveArgs, TagRemoveResponse>({
      url: TagUrls[TagEndpoints.Remove],
      params: args,
    })
  }
}

export default TagsApi;
