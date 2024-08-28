import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";

type CollectNamesType = {
  name: string;
  query: Partial<GetMapsApiArg>;
};
export const collectNames: CollectNamesType[] = [
  {
    name: "Невыполненные",
    query: { isCompleted: false },
  },
  {
    name: "Выполненные",
    query: { isCompleted: true },
  },
  {
    name: "Избранные",
    query: { isFavorite: true },
  },
];
