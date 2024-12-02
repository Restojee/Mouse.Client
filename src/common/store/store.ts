import ActionManager from '@common/store/async/AsyncManager';
import { FormSchema } from "@common/store/form/FormSchema";
import { CreateStateArgs } from "@common/store/form/types";

const withForm = <E extends {}>(value: E) => new FormSchema(value);

class Store<Par, State extends {} = {}> {

  protected state: State;
  protected readonly actions: ActionManager<Par>;

  constructor() {

  }

  protected createState(builder: (args: CreateStateArgs) => State) {
    this.state = builder({ withForm });
  }

  public getState(): State {
    return this.state;
  }
}

export default Store;