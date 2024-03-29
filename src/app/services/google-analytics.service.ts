import { Injectable } from "@angular/core";

@Injectable()
export class GoogleAnalyticsService {
  constructor() {}

  public emitEvent(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    ga("send", "event", {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue,
    });
  }
}
