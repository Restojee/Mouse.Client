import State from "@common/hocs/withView/decorators/State";
import Computed from "@common/hocs/withView/decorators/Computed";
import Action from "@common/hocs/withView/decorators/Action";
import OnMounted from "@common/hocs/withView/decorators/OnMounted";
import { SupportedLanguage } from "@common/services/intl";
import i18n from 'i18next';

/**
 * ViewModel для переключателя языков
 * Управляет состоянием языка и предоставляет методы для его изменения
 */
export class LanguageSwitcherViewModel {
  
  // 🎯 Состояние компонента
  @State()
  currentLanguage: SupportedLanguage = SupportedLanguage.RU;

  // 🧮 Вычисляемые свойства
  @Computed()
  get supportedLanguages(): SupportedLanguage[] {
    return [SupportedLanguage.RU, SupportedLanguage.EN];
  }

  @Computed()
  get getLanguageName(): (language: SupportedLanguage) => string {
    return (language: SupportedLanguage) => {
      const names = {
        [SupportedLanguage.RU]: 'Русский',
        [SupportedLanguage.EN]: 'English'
      };
      return names[language];
    };
  }

  @Computed()
  get isLanguageActive(): (language: SupportedLanguage) => boolean {
    return (language: SupportedLanguage) => {
      return this.currentLanguage === language;
    };
  }

  // ⚡ Действия
  @Action()
  async changeLanguage(language: SupportedLanguage): Promise<void> {
    if (this.currentLanguage !== language) {
      this.currentLanguage = language;
      await i18n.changeLanguage(language);
    }
  }

  @Action()
  private updateCurrentLanguage(): void {
    // Получаем текущий язык из i18n и приводим к SupportedLanguage
    const currentLang = i18n.language as string;
    if (currentLang === SupportedLanguage.RU) {
      this.currentLanguage = SupportedLanguage.RU;
    } else if (currentLang === SupportedLanguage.EN) {
      this.currentLanguage = SupportedLanguage.EN;
    } else {
      // Если язык не поддерживается, используем русский по умолчанию
      this.currentLanguage = SupportedLanguage.RU;
    }
  }

  // 🚀 Инициализация
  @OnMounted()
  initialize(): void {
    // Устанавливаем текущий язык из i18n
    this.updateCurrentLanguage();
    
    // Подписываемся на изменения языка
    i18n.on('languageChanged', (lng: string) => {
      if (lng === SupportedLanguage.RU) {
        this.currentLanguage = SupportedLanguage.RU;
      } else if (lng === SupportedLanguage.EN) {
        this.currentLanguage = SupportedLanguage.EN;
      }
    });
  }
}
