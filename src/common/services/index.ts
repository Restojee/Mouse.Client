import { Theme, ThemeInjectKey } from "@common/themes/core/Theme";
import Palette, { PaletteInjectKey } from "@common/themes/core/Pallete";
import { ModalService, ModalServiceInjectKey } from "@common/services/modal/ModalService";
import { HttpHandler, HttpInjectKey } from "@common/http/HttpHandler";
import { Inject } from "@common/utils/di/Inject";
import { Register } from "@common/utils/di/Register";

export const AppModuleInjectKey = Symbol.for('ServicesInjectKey');

@Register(AppModuleInjectKey)
class AppModule {
  constructor(
    @Inject(ThemeInjectKey) private theme: Theme,
    @Inject(PaletteInjectKey) private palette: Palette,
    @Inject(ModalServiceInjectKey) private modalService: ModalService,
    @Inject(HttpInjectKey) private httpHandler: HttpHandler
  ) {
    console.log(theme, 'test')
  }
}

export default AppModule;
