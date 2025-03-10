import { LevelEndpoints, LevelUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";

import { inject, injectable } from "inversify";
import {
  LevelByIdRequest,
  LevelByIdResponse,
  LevelCollectRequest,
  LevelCollectResponse,
  LevelCreateRequest,
  LevelCreateResponse,
  LevelRemoveRequest, LevelRemoveResponse,
  LevelUpdateRequest,
  LevelUpdateResponse,
} from "@common/api/levels/models";
import { HttpHandlerInjectKey } from "@common/http/constants";

@injectable()
class LevelsApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(args: LevelCollectRequest): Promise<LevelCollectResponse> {
    return this.http.get<LevelCollectRequest, LevelCollectResponse>({
      url: LevelUrls[LevelEndpoints.Collect],
      params: args,
    })
  }

  public get(args: LevelByIdRequest): Promise<LevelByIdResponse> {
    return this.http.get<LevelByIdRequest, LevelByIdResponse>({
      url: LevelUrls[LevelEndpoints.ById],
      params: args,
    })
  }

  public create(args: LevelCreateRequest): Promise<LevelCreateResponse> {
    return this.http.put<LevelCreateRequest, LevelCreateResponse>({
      url: LevelUrls[LevelEndpoints.Create],
      params: args,
    })
  }

  public update(args: LevelUpdateRequest): Promise<LevelUpdateResponse> {
    return this.http.put<LevelUpdateRequest, LevelUpdateResponse>({
      url: LevelUrls[LevelEndpoints.Update],
      params: args,
    })
  }

  public remove(args: LevelRemoveRequest): Promise<LevelRemoveResponse> {
    return this.http.delete<LevelRemoveRequest, LevelRemoveResponse>({
      url: LevelUrls[LevelEndpoints.Remove],
      params: args,
    })
  }
}

export default LevelsApi;
