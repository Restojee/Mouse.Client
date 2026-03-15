import { User } from '@common/api/tags/types';
import { Level } from '@common/api/levels/models';

export interface Completed {
  id: number;
  description: string;
  image?: string;
  createdUtcDate: string;
  user: User;
  level: Level;
}

export interface CollectCompletedRequest {
  levelId?: number;
  userId?: number;
  page?: number;
  size?: number;
}

export type CollectCompletedResponse = Completed[]

export interface CreateCompletedRequest {
  levelId: number;
  userId: number;
  description: string;
}

export type CreateCompletedResponse = Completed;

export interface UpdateCompletedRequest {
  completedId: number;
  description?: string;
  userId?: number;
  levelId?: number;
}

export interface UpdateCompletedImageRequest {
  id: number;
  image: File | string;
}

export interface UpdateCompletedResponse {
  message: string;
}

export interface DeleteCompletedRequest {
  levelCompletedIds : number[];
}

export interface DeleteCompletedResponse {
  message: string;
}
