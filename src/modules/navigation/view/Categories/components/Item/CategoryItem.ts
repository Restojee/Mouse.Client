import Prop from "@common/hocs/withView/decorators/Prop";
import { UrlBuilder, UrlNavigationParams } from "@common/services/router";

class CategoryItem  {
  @Prop()
  public id: string;

  @Prop()
  public title: string;

  @Prop()
  public icon: string;

  @Prop()
  public caption?: string;

  public get urlWithCategory(): UrlBuilder {
    return UrlBuilder.create()
      .withParam(UrlNavigationParams.category, this.id)
  }
}

export default CategoryItem;
