import { GetInstance } from '@common/instances/types';

interface AsyncOptions {
  getInstance: GetInstance
}
class Selector<Req, Res> {


  public create(handler: (request: Req, options: AsyncOptions) => Res) {
    return this;
  }

  get(req: Req) {
    return req;
  }
}

export default Selector;