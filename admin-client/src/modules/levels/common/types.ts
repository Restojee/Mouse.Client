import { CompletedData } from '@/modules/levels/completed/services/types';

export interface UserData {
  id: number,
  avatar: string,
  username: string,
  email: string,
  createdUtcDate: string,
  modifiedUtcDate: string,
}

export interface TagData {
  id: number;
  name: string;
  description: string;
}

export interface LevelData {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdUtcDate: string,
  modifiedUtcDate: string,
  user?: UserData;
  tags?: TagData[];
  completed?: CompletedData[];
}
