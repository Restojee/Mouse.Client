import { LevelEndpoints, LevelUrls } from './endpoints';
import { AppInstance } from '@common/instances';
import { HttpInjectKey } from '@common/services';
import { HttpHandler } from '@common/http/HttpHandler';
import {
  LevelByIdArgs, LevelByIdResponse,
  type LevelCollectArgs,
  type LevelCollectResponse,
  type LevelCreateArgs,
  type LevelCreateResponse,
  type LevelRemoveArgs, LevelRemoveResponse,
  type LevelUpdateArgs,
  type LevelUpdateResponse,
} from "./types";

class LevelsApi {

  public static GlobalInjectKey = 'LevelsApiKey';
  private readonly http: HttpHandler;

  constructor() {
    this.http = AppInstance.get<HttpHandler>(HttpInjectKey);
  }

  public collect(args: LevelCollectArgs): Promise<LevelCollectResponse> {
    return this.http.get<LevelCollectArgs, LevelCollectResponse>({
      url: LevelUrls[LevelEndpoints.Collect],
      params: args,
    })
  }

  public get(args: LevelByIdArgs): Promise<LevelByIdResponse> {
    return this.http.get<LevelByIdArgs, LevelByIdResponse>({
      url: LevelUrls[LevelEndpoints.ById],
      params: args,
    })
  }

  public create(args: LevelCreateArgs): Promise<LevelCreateResponse> {
    return this.http.put<LevelCreateArgs, LevelCreateResponse>({
      url: LevelUrls[LevelEndpoints.Create],
      params: args,
    })
  }

  public update(args: LevelUpdateArgs): Promise<LevelUpdateResponse> {
    return this.http.put<LevelUpdateArgs, LevelUpdateResponse>({
      url: LevelUrls[LevelEndpoints.Update],
      params: args,
    })
  }

  public remove(args: LevelRemoveArgs): Promise<LevelRemoveResponse> {
    return this.http.delete<LevelRemoveArgs, LevelRemoveResponse>({
      url: LevelUrls[LevelEndpoints.Remove],
      params: args,
    })
  }
}

export default LevelsApi;