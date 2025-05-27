import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import React, { MouseEvent } from "react";
import Prop from "@common/hocs/withView/decorators/Prop";
import { UrlBuilder } from "@common/services/router";
import { inject } from "inversify";

class LinkViewModel {

  @Prop()
  public to: UrlBuilder;

  @Prop()
  public linkUrl: string;

  @Prop()
  public classPrx: string;

  @Prop()
  public children: React.ReactNode;

  constructor(
    @inject(HistoryServiceInjectKey)
    private readonly historyService: HistoryService
  ) {}

  public push(event: MouseEvent): void {
    event.preventDefault();
    this.historyService.push(this.to)
  }
}

export default LinkViewModel;
