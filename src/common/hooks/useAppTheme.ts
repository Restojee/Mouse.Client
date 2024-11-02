import { AppInstance } from '@common/instances';
import { ThemeInjectKey } from '@common/services';
import { Theme } from '@common/themes/core/Theme';

const useTheme = () => AppInstance.get<Theme>(ThemeInjectKey)

export default useTheme;
