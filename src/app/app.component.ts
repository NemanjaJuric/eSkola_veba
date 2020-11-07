import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { SchoolService } from "./services/school.service";
import { RouteService } from "./services/route.service";
import { GoogleAnalyticsService } from "./services/google-analytics.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private routeService: RouteService,
    public googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.initComponent();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initComponent();
        ga("set", "page", event.urlAfterRedirects);
        ga("send", "pageview");
      }
    });
  }

  initComponent() {
    this.pageUrl =
      this.routeService.page.length != 0 ? this.routeService.page : "home";
    this.courseUrl = this.routeService.course;
    this.changeBrowserTheme();
    if (
      this.pageUrl === "course" ||
      this.pageUrl === "web-center" ||
      this.pageUrl === "ts-compiler" ||
      this.pageUrl === "sass-compiler" ||
      this.pageUrl === "lessons-input" ||
      this.pageUrl === "book"
    ) {
      this.showMore = false;
    } else {
      this.showMore = true;
    }
  }

  pageUrl: string;
  courseUrl: string;
  showMore: boolean;
  browserColor: string;

  changeBrowserTheme(): void {
    var metaTheme = document.getElementsByName("theme-color")[0];
    switch (this.pageUrl) {
      case "":
        this.browserColor = "#37474F";
        break;
      case "home":
        this.browserColor = "#37474F";
        break;
      case "about":
        this.browserColor = "#00a961";
        break;
      case "web-center":
        this.browserColor = "#37474F";
        break;
      case "ts-compiler":
        this.browserColor = "#294e80";
        break;
      default:
        switch (this.courseUrl) {
          case "html":
            this.browserColor = "#d32f2f";
            break;
          case "css":
            this.browserColor = "#1673b6";
            break;
          case "js":
            this.browserColor = "#e6b130";
            break;
          case "jq":
            this.browserColor = "#0097a7";
            break;
          case "bs":
            this.browserColor = "#5a4181";
            break;
          case "bs4":
            this.browserColor = "#5a4181";
            break;
          case "ang":
            this.browserColor = "#c3002f";
            break;
          case "vue":
            this.browserColor = "#41b883";
            break;
          case "php":
            this.browserColor = "#5C6BC0";
            break;
          case "lara":
            this.browserColor = "#fb503b";
            break;
          case "ts":
            this.browserColor = "#294e80";
            break;
          case "ang4":
            this.browserColor = "#c3002f";
            break;
          case "java":
            this.browserColor = "#BF360C";
            break;
          case "spring":
            this.browserColor = "#6db33f";
            break;
          case "express":
            this.browserColor = "#1976D2";
            break;
          case "sql":
            this.browserColor = "#7986CB";
            break;
          case "veb":
            this.browserColor = "#47789e";
            break;
          case "dp":
            this.browserColor = "#546E7A";
            break;
        }
    }
    metaTheme.setAttribute("content", this.browserColor);
  }
}
