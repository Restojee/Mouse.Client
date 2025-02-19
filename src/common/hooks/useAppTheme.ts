import { Theme, ThemeInjectKey } from "@common/themes/core/Theme";
import { Instance } from "@common/instances/Instance";

const useTheme = () => Instance.get<Theme>(ThemeInjectKey)

export default useTheme;
