import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Injectable()
export class RouteService {
  constructor(private router: Router) {
    this.initRoutes();
    this.router.events.subscribe((event) => {
      this.initRoutes();
    });
  }

  url: string;
  page: string;
  course: string;
  lesson: string;

  initRoutes() {
    this.url = this.router.url;
    let routes = this.url.split("?")[0].split("/");
    this.page = routes[1] ? routes[1] : "home";
    this.course = routes[2] ? routes[2] : null;
    this.lesson = routes[3] ? routes[3] : null;
  }

  setRoute(page, course, lesson) {
    var pageUrl = page != null ? page : "";
    var courseUrl = course != null ? "/" + course : "";
    var lessonUrl = lesson != null ? "/" + lesson : "";
    this.router.navigateByUrl(pageUrl + courseUrl + lessonUrl);
  }

  getCourseRoute(): any {
    this.initRoutes();
    return this.course + "/" + this.lesson === null
      ? null
      : this.course + "/" + this.lesson;
  }

  getTestRoute(): any {
    this.initRoutes();
    return this.course;
  }
}
