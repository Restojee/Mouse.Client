import { GlobalTheme } from "./src/layout/theme/types";

declare module "styled-components" {
  export interface DefaultTheme extends GlobalTheme {}
}
