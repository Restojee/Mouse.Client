// TODO Вынести в Тему

import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/common/types";
import { ThemeResultsByBySize, ThemeSizes } from "@common/themes/common/types";

export const getPaddingStyles = (
  themeLayoutSpaceMap: ThemeResultsByBySize,
  propMap: ThemePaddingSizesMap
): string => {
  let top: string | undefined;
  let bottom: string | undefined;
  let left: string | undefined;
  let right: string | undefined;

  const mapping: Record<string, (value: string) => void> = {
    pa: v => (top = bottom = left = right = v),
    px: v => (left = right = v),
    py: v => (top = bottom = v),
    pr: v => (right = v),
    pl: v => (left = v),
    pb: v => (bottom = v),
    pt: v => (top = v),
  };

  Object.entries(propMap).forEach(([key, size]) => {
    const sizePx = themeLayoutSpaceMap[size];
    if (sizePx && mapping[key]) {
      mapping[key](sizePx);
    }
  });

  return [top, right, bottom, left].map(v => v ?? '0').join(' ');
}

export const getPercent = (number: number): string => `${number * 100}%`;
export const getPx = (number: number): string => `${number}px`;
export const calcSize = (size: number | string): string =>
  (typeof size === 'number') ? size <= 1 ? getPercent(size) : getPx(size) : size
export const getBorderRadius =
  (themeBorderRadiusMap: Partial<ThemeResultsByBySize>, size: ThemeSizes) => themeBorderRadiusMap[size];

type Styles = Record<string, string> | undefined;

export interface AutoClassOptions {
  /**
   * Пропсы компонента, содержащие булевые флаги или строковые значения для маппинга
   */
  props: Record<string, any>;

  /**
   * Список классов, которые должны быть сгенерированы:
   * - `'someProp'` — добавляет класс, если пропс `true`
   * - `['someProp', mapping]` — маппит значение пропса в класс по заданному объекту
   */
  bindings: (string | [string, Record<string, string>])[];

  /**
   * Основной класс (например, `rootClass`), который добавляется всегда
   */
  root?: string;

  /**
   * CSS-модуль со стилями, используется для получения классов по ключу
   */
  styles?: Styles;
}

export const getAutoClasses = ({ props, bindings, root, styles }: AutoClassOptions): string => {
  const classes = bindings.flatMap(binding => {
    if (typeof binding === 'string') {
      return props[binding] ? styles?.[binding] || binding : [];
    } else {
      const [prop, mapping] = binding;
      const value = props[prop];
      return value && typeof value === 'string' && mapping[value]
        ? styles?.[mapping[value]] || mapping[value]
        : [];
    }
  });

  return [root, ...classes].filter(Boolean).join(' ');
};
