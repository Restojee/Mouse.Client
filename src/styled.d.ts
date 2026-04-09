import { GlobalTheme } from "./layout/theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends GlobalTheme {}
}
