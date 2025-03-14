import { NavigationItemCategoryEntity } from "@/modules/navigation/model/NavigationItemCategoryEntity";

export class NavigationSectionEntity {
  constructor(
    public id: string,
    public title: string,
    public categories: NavigationItemCategoryEntity[]
  ) {}
}
