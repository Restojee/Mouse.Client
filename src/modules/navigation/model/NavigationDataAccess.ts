import EntityManager from "@common/store/entity/EntityManager";
import { injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/NavigationItemCategoryEntity";
import { t } from "@common/locales";

@injectable()
export class NavigationDataAccess {

  private readonly navigationItems: EntityManager<NavigationSectionEntity>;

  constructor() {

    this.navigationItems = new EntityManager<NavigationSectionEntity>();
    console.log(this.navigationItems)
    this.navigationItems.set(
      new NavigationSectionEntity('main', t('Navigation.Section.Main'), [
        new NavigationItemCategoryEntity('all', t('Navigation.Category.All')),
      ])
    );

    this.navigationItems.set(
      new NavigationSectionEntity('myCollection', t('Navigation.Section.MyCollection'), [
        new NavigationItemCategoryEntity('favorites', t('Navigation.Category.Favorites')),
        new NavigationItemCategoryEntity('completed', t('Navigation.Category.Completed')),
        new NavigationItemCategoryEntity('uncompleted', t('Navigation.Category.Uncompleted')),
        new NavigationItemCategoryEntity('commented', t('Navigation.Category.Commented')),
        new NavigationItemCategoryEntity('hasNote', t('Navigation.Category.HasNote')),
      ])
    );
  }

  public getNavigationItemsEntityManager(): EntityManager<NavigationSectionEntity>{
    return this.navigationItems;
  };
}
