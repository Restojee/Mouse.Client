import { injectable } from "inversify";
import { NavigationSectionEntity } from "@/modules/navigation/model/NavigationSectionEntity";
import { NavigationItemCategoryEntity } from "@/modules/navigation/model/NavigationItemCategoryEntity";
import { tNavCategory, tNavSection } from "@/modules/navigation/common/utils";
import { makeAutoObservable, computed, observable } from "mobx";
import i18n from 'i18next';

const sleep = (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms)
})

@injectable()
export class NavigationDataAccess {

  // Observable для отслеживания изменений языка
  @observable
  private currentLanguage: string = i18n.language;

  constructor() {
    makeAutoObservable(this);
    
    // Подписываемся на изменения языка
    i18n.on('languageChanged', (lng: string) => {
      this.currentLanguage = lng;
    });
  }

  @computed
  public get getNavigationItems(): NavigationSectionEntity[]{
    // Обращаемся к currentLanguage чтобы MobX видел зависимость
    const _ = this.currentLanguage;
    
    // Создаем элементы навигации каждый раз с актуальными переводами
    return [
      new NavigationSectionEntity('main', tNavSection('Main'), [
        new NavigationItemCategoryEntity('all', tNavCategory('All'), 'IconAll'),
      ]),
      new NavigationSectionEntity('myCollection', tNavSection('MyCollection'), [
        new NavigationItemCategoryEntity('favorites', tNavCategory('Favorites'), 'IconFavorite'),
        new NavigationItemCategoryEntity('completed', tNavCategory('Completed'), 'IconCompleted'),
        new NavigationItemCategoryEntity('uncompleted', tNavCategory('Uncompleted'), 'IconUncompleted'),
        new NavigationItemCategoryEntity('commented', tNavCategory('Commented'), 'IconCommented'),
        new NavigationItemCategoryEntity('hasNote', tNavCategory('HasNote'), 'IconNote'),
      ])
    ];
  };

  public createNavigationItems() {
    // Метод больше не нужен, но оставляем для совместимости
  }
}
