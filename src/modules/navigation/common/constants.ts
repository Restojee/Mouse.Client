import { NavigationSectionEntity } from "@/modules/navigation/model/NavigationSectionEntity";

export const NavigationDataAccessInjectKey = 'NavigationDataAccess';
export const NavigationServiceInjectKey = 'NavigationService';
export const navigationPrx = 'Navigation';

export const NavigationItemCategoryMeta: Record<string, keyof NavigationSectionEntity> = {
  Title: "title",
}
