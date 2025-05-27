import { injectable } from "inversify";
import i18n from 'i18next';
import { SupportedLanguage } from './types';

@injectable()
export class IntlService {
  
  /**
   * Получить текущий язык
   */
  public getCurrentLanguage(): SupportedLanguage {
    const lang = i18n.language;
    return this.validateLanguage(lang);
  }

  /**
   * Изменить язык
   */
  public async changeLanguage(language: SupportedLanguage): Promise<void> {
    await i18n.changeLanguage(language);
  }

  /**
   * Перевести текст по ключу
   */
  public translate(key: string, options?: any): string {
    const result = i18n.t(key, options);
    return typeof result === 'string' ? result : String(result);
  }

  /**
   * Перевести текст с сокращенным синтаксисом
   */
  public t(key: string, options?: any): string {
    return this.translate(key, options);
  }

  /**
   * Проверить поддерживается ли язык
   */
  public isSupportedLanguage(language: string): language is SupportedLanguage {
    return Object.values(SupportedLanguage).includes(language as SupportedLanguage);
  }

  /**
   * Преобразовать строку в SupportedLanguage или вернуть язык по умолчанию
   */
  private validateLanguage(language: string): SupportedLanguage {
    if (language === SupportedLanguage.RU) {
      return SupportedLanguage.RU;
    } else if (language === SupportedLanguage.EN) {
      return SupportedLanguage.EN;
    }
    return SupportedLanguage.RU; // Язык по умолчанию
  }

  /**
   * Получить список поддерживаемых языков
   */
  public getSupportedLanguages(): SupportedLanguage[] {
    return Object.values(SupportedLanguage);
  }

  /**
   * Получить название языка на родном языке
   */
  public getLanguageNativeName(language: SupportedLanguage): string {
    const nativeNames = {
      [SupportedLanguage.RU]: 'Русский',
      [SupportedLanguage.EN]: 'English'
    };
    return nativeNames[language];
  }

  /**
   * Получить флаг эмодзи для языка
   */
  public getLanguageFlag(language: SupportedLanguage): string {
    const flags = {
      [SupportedLanguage.RU]: '🇷🇺',
      [SupportedLanguage.EN]: '🇺🇸'
    };
    return flags[language];
  }
} 