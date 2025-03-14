abstract class ViewModelWithLifecycle<Props = {}, Deps extends any[] = []> {
  public init?(): void;
  public destroy?(): void;
  protected props: Props;

  protected constructor(..._deps: Deps) {}

  public useProps(): Props {
    return this.props;
  }

  public setProps(props: Props) {
    this.props = props;
    this.notifyObservers(props);
  }

  private observers: Array<(deps: Props) => void> = [];

  protected addObserver(observer: (deps: Props) => void): void {
    this.observers.push(observer);
  }

  protected removeObserver(observer: (deps: Props) => void): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  protected notifyObservers(deps: Props): void {
    this.observers.forEach((observer) => observer(deps));
  }
}
export default ViewModelWithLifecycle;
