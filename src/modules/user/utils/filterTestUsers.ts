import { User } from "@/api/codegen/genMouseMapsApi";

export const filterTestUsers = (users: User[]): User[] => {
  return users.filter(el => el.username !== 'root' && el.username !== 'string')
}
