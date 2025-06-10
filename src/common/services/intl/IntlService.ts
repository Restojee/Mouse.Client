import { injectable } from "inversify";
import { SupportedLanguage } from './types';
import { makeAutoObservable } from "mobx";
import i18n from "i18next";
import { t } from "@common/locales";
import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";
import State from "@common/hocs/withView/decorators/State";

@injectable()
export class IntlService {

  @State()
  private currentLanguage: SupportedLanguage = i18n.language as SupportedLanguage;

  constructor() {
    this.initLanguageChangedEvent();
  }

  private initLanguageChangedEvent() {
    i18n.on('languageChanged', (lng: SupportedLanguage) => {
      this.currentLanguage = lng;
    });
  }

  @Computed()
  public get actualLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  @Action()
  public async changeLanguage(language: SupportedLanguage): Promise<void> {
    await i18n.changeLanguage(language);
  }

  @Computed()
  public get t(): (key: string) => string {
    /* Для реактивности */
    const _ = this.currentLanguage;

    return (key: string) => t(key);
  }
}
