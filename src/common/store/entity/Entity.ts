class Entity {

  private _id: string;

  public getId() {
    return this._id;
  }

  public setId(id: string) {
    this._id = id;
  }
}

export default Entity;