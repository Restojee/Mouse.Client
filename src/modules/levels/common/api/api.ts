import { LevelEndpoints, LevelUrls } from './endpoints';
import { AppInstance } from '@common/instances';
import { HttpInjectKey } from '@common/services';
import { HttpHandler } from '@common/http/HttpHandler';
import {
  type LevelByIdArgsType,
  type LevelByIdResponseType,
  type LevelCollectArgsType,
  type LevelCollectResponseType,
  type LevelCreateArgsType,
  type LevelCreateResponseType,
  type LevelRemoveArgsType, LevelRemoveResponseType,
  type LevelUpdateArgsType,
  type LevelUpdateResponseType,
} from './types';

class LevelsApi {

  public static GlobalInjectKey = 'LevelsApiKey';
  private readonly http: HttpHandler;

  constructor() {
    this.http = AppInstance.get<HttpHandler>(HttpInjectKey);
  }

  public [LevelEndpoints.Collect](args: LevelCollectArgsType): Promise<LevelCollectResponseType> {
    return this.http.get<LevelCollectArgsType, LevelCollectResponseType>({
      url: LevelUrls[LevelEndpoints.Collect],
      params: args,
    })
  }

  public [LevelEndpoints.ById](args: LevelByIdArgsType): Promise<LevelByIdResponseType> {
    return this.http.get<LevelByIdArgsType, LevelByIdResponseType>({
      url: LevelUrls[LevelEndpoints.ById],
      params: args,
    })
  }

  public [LevelEndpoints.Create](args: LevelCreateArgsType): Promise<LevelCreateResponseType> {
    return this.http.put<LevelCreateArgsType, LevelCreateResponseType>({
      url: LevelUrls[LevelEndpoints.Create],
      params: args,
    })
  }

  public [LevelEndpoints.Update](args: LevelUpdateArgsType): Promise<LevelUpdateResponseType> {
    return this.http.put<LevelUpdateArgsType, LevelUpdateResponseType>({
      url: LevelUrls[LevelEndpoints.Update],
      params: args,
    })
  }

  public [LevelEndpoints.Remove](args: LevelRemoveArgsType): Promise<LevelRemoveResponseType> {
    return this.http.delete<LevelRemoveArgsType, LevelRemoveResponseType>({
      url: LevelUrls[LevelEndpoints.Remove],
      params: args,
    })
  }
}

export default LevelsApi;