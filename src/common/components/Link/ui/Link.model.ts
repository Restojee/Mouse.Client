import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import React, { MouseEvent } from "react";
import Input from "@common/hocs/withView/decorators/Prop";
import { UrlBuilder } from "@common/services/router";
import { inject } from "inversify";
import Action from "@common/hocs/withView/decorators/Action";

class LinkViewModel {

  @Input()
  public to: UrlBuilder;

  @Input()
  public linkUrl: string;

  @Input()
  public classPrx: string;

  @Input()
  public children: React.ReactNode;

  constructor(
    @inject(HistoryServiceInjectKey)
    private readonly historyService: HistoryService
  ) {}

  @Action()
  public push = (event: MouseEvent): void => {
    event.preventDefault();
    this.historyService.push(this.to)
  }
}

export default LinkViewModel;
