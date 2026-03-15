import { User } from '@common/api/tags/types';
import { Level } from '@common/api/levels/models';

export interface Favorite {
  id: number;
  description: string;
  image?: string;
  createdUtcDate: string;
  user: User;
  level: Level;
}

export interface CollectFavoriteRequest {
  levelId?: number;
  userId?: number;
}

export type CollectFavoriteResponse = Favorite[]

export interface CreateFavoriteRequest {
  levelIds: number[];
  userId: number;
}

export interface CreateFavoriteResponse {
  message: string;
}

export interface DeleteFavoriteRequest {
  LevelFavoriteIds: number[];
}

export interface DeleteFavoriteResponse {
  message: string;
}

export interface UpdateFavoriteRequest {
  favoriteId: number;
  userId?: number;
  levelId?: number;
  description?: string;
}

export type UpdateFavoriteResponse = Favorite;
