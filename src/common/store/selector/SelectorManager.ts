import Selector from '@common/store/selector/Selector';

class SelectorManager {
  public static DefaultInjectKey = 'SelectorManager';

  public bind<Req, Res>(selector: Selector<Req, Res>): Selector<Req, Res> {
    return selector.create(this);
  }
}

export default SelectorManager;