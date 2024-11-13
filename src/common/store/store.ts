import SelectorManager from '@common/store/getter/SelectorManager';
import ActionManager from '@common/store/async/AsyncManager';
import { FormSchema } from "@common/store/formSchema";
import EntityState from "@common/store/entity/EntityState";

const withForm = <E extends {}>(value: E) => new FormSchema(value);

interface CreateStateArgs {
  withForm: <E extends {}>(value: E) => FormSchema<E>
}

class Store<Par, State extends {} = {}> {

  protected state: State;
  protected readonly actions: ActionManager<Par>;
  protected readonly selectors: SelectorManager;

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