import { Constants } from "@/layout/theme/DefaultTheme";

type Theme = typeof Constants;

declare module "styled-components" {

    export interface DefaultTheme extends Theme {}
}