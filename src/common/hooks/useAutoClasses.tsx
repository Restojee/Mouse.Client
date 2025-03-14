import { AutoClassOptions, getAutoClasses } from "@common/themes/common/utils";

/**
 * Опции для HOC `withAutoClasses`
 * @template Props - Тип пропсов, принимаемых компонентом
 */
type WithAutoClassesOptions = Pick<AutoClassOptions, 'bindings' | 'root' | 'styles'>

export type WithAutoClassProps<T> = { autoClasses?: string } & T;

/**
 * HOC для автоматической генерации `autoClasses` на основе переданных пропсов.
 *
 * Этот HOC оборачивает компонент и добавляет новый проп `autoClasses`,
 * содержащий сгенерированную строку CSS-классов на основе переданных пропсов и их значений.
 *
 * @template Props - Объект пропсов компонента, который передается в HOC.
 * Props должен включать булевые значения (например, `true | false`)
 * или строковые значения (например, `'sm' | 'md' | 'lg'`), если используются маппинги.
 *
 * @param {React.ComponentType<Props & { autoClasses?: string }>} Component - Исходный компонент
 * @param {WithAutoClassesOptions<Props>} options - Настройки биндинга классов:
 *   - `bindings` - массив строк или `[prop, mapping]`:
 *     - `'ellipsis'` → добавляет класс `ellipsis`, если пропс `true`
 *     - `['fontSize', mapping]` → берет значение `fontSize` и ищет его в `mapping`
 *   - `root` - добавляется всегда
 *   - `styles` - объект модульных стилей (если используется CSS-модуль)
 *
 * @returns {React.FC<Props>} Обернутый компонент с новым пропом `autoClasses`
 *
*/
const withAutoClasses = <Props extends Record<string, any>>(
  Component: React.ComponentType<Props>,
  options: WithAutoClassesOptions
): React.FC<Props> => {
  return (props: Props) => {
    const autoClasses = getAutoClasses({
      props,
      bindings: options.bindings,
      root: options.root,
      styles: options.styles
    });

    return <Component {...props} autoClasses={autoClasses} />;
  };
};

export default withAutoClasses;
