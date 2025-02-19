import { LevelEndpoints, LevelUrls } from './endpoints';
import { HttpHandler, HttpInjectKey } from "@common/http/HttpHandler";
import {
  LevelByIdArgs,
  LevelByIdResponse,
  LevelCollectArgs,
  LevelCollectResponse,
  LevelCreateArgs,
  LevelCreateResponse,
  LevelRemoveArgs,
  LevelRemoveResponse,
  LevelUpdateArgs,
  LevelUpdateResponse,
} from "@/modules/levels/common/api/types";
import { Register } from "@common/utils/di/Register";
import { Inject } from "@common/utils/di/Inject";

export const LevelApiInjectKey = 'LevelApi';

@Register(LevelApiInjectKey)
class LevelsApi {

  constructor(@Inject(HttpInjectKey) private http: HttpHandler) {}

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