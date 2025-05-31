import { injectable } from "inversify";
import { SupportedLanguage } from './types';
import { makeAutoObservable } from "mobx";
import i18n from "i18next";
import { t } from "@common/locales";

@injectable()
export class IntlService {

  private currentLanguage: SupportedLanguage = i18n.language as SupportedLanguage;

  constructor() {
    makeAutoObservable(this);
    this.initLanguageChangedEvent();
  }

  private initLanguageChangedEvent() {
    i18n.on('languageChanged', (lng: SupportedLanguage) => {
      this.currentLanguage = lng;
    });
  }

  public get actualLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  public async changeLanguage(language: SupportedLanguage): Promise<void> {
    await i18n.changeLanguage(language);
  }

  public get t(): (key: string) => string {
    /* Для реактивности */
    const _ = this.currentLanguage;

    return (key: string) => t(key);
  }
}
