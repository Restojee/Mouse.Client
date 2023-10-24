import { GetMapsApiArg } from '@/api/codegen/genMouseMapsApi';

export function checkFilter(obj: GetMapsApiArg, filter: Partial<GetMapsApiArg>): boolean {
    for (const key in filter) {
        // @ts-ignore
        if (filter[key] !== obj[key]) {
            return false;
        }
    }
    return true;
}