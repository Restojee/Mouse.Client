import ActionManager from '@common/store/async/AsyncManager';

class Store<Par, State extends {} = {}> {

  protected state: State;
  protected readonly actions: ActionManager<Par>;

  constructor() {

  }

  protected createState(state: State) {
    this.state = state;
  }

  public getState(): State {
    return this.state;
  }
}

export default Store;