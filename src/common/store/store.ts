import SelectorManager from '@common/store/getter/SelectorManager';
import ActionManager from '@common/store/async/AsyncManager';
import Async from "@common/store/async/Async";
import Selector from "@common/store/getter/Getter";
import { AsyncAction } from "@common/store/async/types";

class Store<Par, State extends {} = {}> {

  protected state: State;
  protected readonly actions: ActionManager<Par>;
  protected readonly selectors: SelectorManager;

  constructor() {

  }

  protected createState(state: State) {
    this.state = state;
  }

  public getState(): State {
    return this.state;
  }

  protected bindAction<Req>(action: Async<Req, Par>): AsyncAction<Req> {
    return this.actions.add(action)
  }

  protected bindSelector<Req, Res>(selector: any): Selector<Req, Res> {
    return this.selectors.bind(selector)
  }
}

export default Store;