import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { inject, injectable } from "inversify";

@injectable()
export class NavigationService {
  constructor(
    private readonly navigationDataAccess: NavigationDataAccess
  ) {}
}
