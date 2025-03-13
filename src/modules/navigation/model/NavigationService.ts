import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { NavigationDataAccessInjectKey } from "@/modules/navigation/common/constants";
import { inject, injectable } from "inversify";

@injectable()
export class NavigationService {
  constructor(
    @inject(NavigationDataAccessInjectKey)
    private readonly navigationDataAccess: NavigationDataAccess
  ) {}
}