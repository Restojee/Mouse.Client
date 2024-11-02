import User from "@/modules/users/User";
import Entity from '@common/store/entity/Entity';

class LevelEntity extends Entity {
  private _name: string;
  private _description: string;
  private _user?: User;

  public getName() {
    return this._name;
  }

  public setName(name: string) {
    this._name = name;
  }

  public setUser(user: User) {
    this._user = user;
  }

  public setDescription(description: string) {
    this._description = description;
  }

  public getUser() {
    return this._user;
  }

}

export default LevelEntity;