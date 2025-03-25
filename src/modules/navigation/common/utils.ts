import { t } from "@common/locales";
import { navigationPrx } from "@/modules/navigation/common/constants";

export const tNavSection = (key: string) => t(`${navigationPrx}.Section.${key}`)
export const tNavCategory = (key: string) => t(`${navigationPrx}.Category.${key}`)
