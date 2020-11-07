import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Course } from "../../classes/course";
import { Technologie } from "../../classes/technologie";
import { SchoolService } from "../../services/school.service";
import { RouteService } from "../../services/route.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  courses: Array<Course>;
  sections: Array<any>;
  technologies: Array<Technologie>;

  private fragment: string;

  constructor(
    private schoolService: SchoolService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCourses();
    this.getTechnologies();
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.fragment = queryParams["fragment"];
    });
    // const t = setTimeout(() => {
    //   window.scrollTo(0, 0);
    //   clearTimeout(t);
    // });
  }

  getCourses(): void {
    this.schoolService.getSections().subscribe((s) => {
      this.sections = s;
      this.schoolService.getCourses().subscribe((c) => {
        this.courses = c;
        if (this.fragment) {
          const element = document.querySelector("#" + this.fragment);
          if (element) {
            const t = setTimeout(() => {
              element.scrollIntoView({ behavior: "smooth" });
              clearTimeout(t);
            }, 500);
          }
        }
      });
    });
  }

  getTechnologies(): void {
    this.schoolService
      .getTechnologies()
      .subscribe((data) => (this.technologies = data));
  }

  setRoute(page, course, lesson): void {
    this.routeService.setRoute(page, course, lesson);
  }

  scrollToSection(sectionName: string) {
    const element = document.querySelector("#" + sectionName);
    if (element) {
      const t = setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
        clearTimeout(t);
      });
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { fragment: sectionName },
    });
  }
}
