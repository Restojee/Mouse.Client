import { UserData } from '@/modules/levels/common/types';

export interface TagFormData {
  name: string;
  description: string;
}

export interface TagData {
  id: number;
  name: string;
  description: string;
  parentTagId?: number;
  parentTag?: { id: number; name: string };
  createdUtcDate?: string,
  modifiedUtcDate?: string,
  user?: UserData;
}

