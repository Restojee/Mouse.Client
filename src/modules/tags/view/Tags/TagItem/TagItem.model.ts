import { UrlBuilder, UrlNavigationParams } from "@common/services/router";
import Input from "@common/hocs/withView/decorators/Prop";

class TagItemModel {
  @Input()
  public id: string;

  @Input()
  public title: string;

  @Input()
  public description?: string;

  public get urlWithTag(): UrlBuilder {
    return UrlBuilder.create()
      .withParam(UrlNavigationParams.category, this.id)
  }
}

export default TagItemModel;
