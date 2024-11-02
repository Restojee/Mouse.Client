import Async from '@common/store/async/Async';

class AsyncManager<S> {
  private readonly _store: S;
  public static DefaultInjectKey = 'AsyncManager';

  constructor(store: S) {
    this._store = store;
  }

  public bind<Req>(async: Async<Req, S>): (req: Req) => void {
    return async.getAsyncAction(this);
  }

  public getStore(): S {
    return this._store;
  }
}

export default AsyncManager;