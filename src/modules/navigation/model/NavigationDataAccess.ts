import EntityManager from "@common/store/entity/EntityManager";
import { injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/NavigationItemCategoryEntity";
import { tNavCategory, tNavSection } from "@/modules/navigation/common/utils";
import State from "@common/hocs/withView/decorators/State";

@injectable()
export class NavigationDataAccess {

  @State()
  private readonly navigationItems: EntityManager<NavigationSectionEntity>;

  constructor() {
    this.navigationItems = new EntityManager<NavigationSectionEntity>();

    this.navigationItems.set(
      new NavigationSectionEntity('main', tNavSection('Main'), [
        new NavigationItemCategoryEntity('all', tNavCategory('All'), 'IconAll'),
      ])
    );

    this.navigationItems.set(
      new NavigationSectionEntity('myCollection', tNavSection('MyCollection'), [
        new NavigationItemCategoryEntity('favorites', tNavCategory('Favorites'), 'IconFavorite'),
        new NavigationItemCategoryEntity('completed', tNavCategory('Completed'), 'IconCompleted'),
        new NavigationItemCategoryEntity('uncompleted', tNavCategory('Uncompleted'), 'IconUncompleted'),
        new NavigationItemCategoryEntity('commented', tNavCategory('Commented'), 'IconCommented'),
        new NavigationItemCategoryEntity('hasNote', tNavCategory('HasNote'), 'IconNote'),
      ])
    );
  }

  public getNavigationItemsEntityManager(): EntityManager<NavigationSectionEntity>{
    return this.navigationItems;
  };
}
