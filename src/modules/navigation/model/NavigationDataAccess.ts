import { inject, injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/NavigationItemCategoryEntity";
import { makeAutoObservable } from "mobx";
import { IntlService, IntlServiceInjectKey } from "@common/services/intl";
import { getNavCategory, getNavSection } from "@/modules/navigation/common/utils";

@injectable()
export class NavigationDataAccess {

  constructor(@inject(IntlServiceInjectKey) private intlService: IntlService) {
    makeAutoObservable(this);
  }

  public get getNavigationItems(): NavigationSectionEntity[] {
    const { t } = this.intlService;
    return [
      new NavigationSectionEntity('main', t(getNavSection('Main')), [
        new NavigationItemCategoryEntity('all', t(getNavCategory('All')), 'IconAll'),
      ]),
      new NavigationSectionEntity('myCollection', t(getNavSection('MyCollection')), [
        new NavigationItemCategoryEntity('favorites', t(getNavCategory('Favorites')), 'IconFavorite'),
        new NavigationItemCategoryEntity('completed', t(getNavCategory('Completed')), 'IconCompleted'),
        new NavigationItemCategoryEntity('uncompleted', t(getNavCategory('Uncompleted')), 'IconUncompleted'),
        new NavigationItemCategoryEntity('commented', t(getNavCategory('Commented')), 'IconCommented'),
        new NavigationItemCategoryEntity('hasNote', t(getNavCategory('HasNote')), 'IconNote'),
      ])
    ];
  };
}
