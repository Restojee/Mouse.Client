import { Theme, ThemeInjectKey } from "@common/themes/core/Theme";
import { container } from "@common/utils/di/DIContainer";

const useTheme = () => container.resolve<Theme>(ThemeInjectKey)

export default useTheme;
