import { Theme } from '@common/themes/core/Theme';
import { AppInstance } from '@common/instances';
import Palette from '@common/themes/core/Pallete';
import { ModalService } from "@common/services/modal/ModalService";
import { HttpHandler } from "@common/http/HttpHandler";

export const ThemeInjectKey = 'Theme';
export const PaletteInjectKey = 'Palette';
export const HttpInjectKey = 'Http';
export const ModalServiceInjectKey = 'ModalServiceInjectKey';

export default class Services {
  constructor() {
    return this;
  }

  init() {
    AppInstance.add(ThemeInjectKey, new Theme());
    AppInstance.add(PaletteInjectKey, new Palette());
    AppInstance.add(ModalServiceInjectKey, new ModalService());
    AppInstance.add(HttpInjectKey, new HttpHandler('', () => ''));
  }
}

