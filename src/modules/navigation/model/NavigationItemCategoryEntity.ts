export class NavigationItemCategoryEntity {

  constructor(public id: string, public title: string) {}

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }
}
