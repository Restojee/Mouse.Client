import { Theme } from '@common/themes/core/Theme';
import Palette from '@common/themes/core/Pallete';
import { ModalService } from "@common/services/modal/ModalService";
import { HttpHandler } from "@common/http/HttpHandler";
import { Inject } from "@common/utils/di/Inject";
import { Register } from "@common/utils/di/Register";

export const ThemeInjectKey = Symbol('Theme');
export const PaletteInjectKey = Symbol('Palette');
export const HttpInjectKey = Symbol('Http');
export const ModalServiceInjectKey = Symbol('ModalServiceInjectKey');
export const ServicesInjectKey = Symbol('ServicesInjectKey');

@Register(ServicesInjectKey)
class Services {
  constructor(
    @Inject(ThemeInjectKey) theme: Theme,
    @Inject(PaletteInjectKey) palette: Palette,
    @Inject(ModalServiceInjectKey) modalService: ModalService,
    @Inject(HttpInjectKey) httpHandler: HttpHandler
  ) {

  }
}

export default Services;
