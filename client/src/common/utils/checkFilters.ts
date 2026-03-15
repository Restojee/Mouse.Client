import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";

export function checkFilter(obj: GetMapsApiArg, filter: Partial<GetMapsApiArg>): boolean {
  for (const key in filter) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (filter[key] !== obj[key]) {
      return false;
    }
  }
  return true;
}
