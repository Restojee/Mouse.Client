import { UserData } from '@/modules/levels/common/types';

export interface CompletedData {
  id: number;
  description: string;
  image?: string;
  createdUtcDate: string;
  user?: UserData;
}

