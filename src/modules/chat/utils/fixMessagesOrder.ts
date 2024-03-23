import { Comment } from '@/api/codegen/genMouseMapsApi';

export const fixMessagesOrder = (messages: Comment[]) => {
  return messages.reverse();
}