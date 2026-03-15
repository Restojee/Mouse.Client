import { GetUsersApiResponse, User } from "@/api/codegen/genMouseMapsApi";

export type UsersStateType = {
  users: GetUsersApiResponse | null;
  openModalByUserId: User["id"] | null;
};
