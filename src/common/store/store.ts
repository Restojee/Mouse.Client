import SelectorManager from '@common/store/selector/SelectorManager';
import AsyncManager from '@common/store/async/AsyncManager';
import { AppInstance } from '@common/instances';

class Store<Par> {

  protected readonly async: AsyncManager<Par>;
  protected readonly selector: SelectorManager;

  constructor() {
    this.async = AppInstance.get<AsyncManager<Par>>(AsyncManager.DefaultInjectKey);
    this.selector = AppInstance.get<SelectorManager>(SelectorManager.DefaultInjectKey);
  }

  protected bindActions(...actions: any[]): void {
    actions.forEach(action => {
      this.async.bind(action)
    })
  }

  protected bindSelectors(...selectors: any[]): void {
    selectors.forEach(selector => {
      this.selector.bind(selector)
    })
  }
}

export default Store;