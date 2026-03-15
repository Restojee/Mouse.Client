import { inject, injectable } from 'inversify';
import FavoriteApi from '@common/api/favorites/api';
import { FavoriteApiInjectKey } from '@/constants';
import { Favorite } from '@common/api/favorites/models';

@injectable()
export class LevelFavoritesActions {
  constructor(
    @inject(FavoriteApiInjectKey) private readonly favoriteApi: FavoriteApi,
  ) {}

  public async getFavorites(levelId: number): Promise<Favorite[]> {
    return await this.favoriteApi.collect({ levelId: 763 });
  }
}
