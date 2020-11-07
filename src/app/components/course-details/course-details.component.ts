import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Course } from "../../classes/course";
import { RouteService } from "../../services/route.service";
import { SchoolService } from "../../services/school.service";

@Component({
  selector: "course-details",
  templateUrl: "./course-details.component.html",
})
export class CourseDetailsComponent implements OnInit {
  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    window.scrollTo(0, 0);
    let url = this.router.url;
    let routes = url.split("/");
    this.courseUrl = routes[2] != undefined ? routes[2] : null;
    this.schoolService.getCourse(this.courseUrl).subscribe((data) => {
      this.course = data;
      this.detailsText = this.course.detailsText;
      this.numOfLessons = this.getNumberOfLessons(this.course);
    });
    this.animatedNumber = 0;
    setInterval(() => this.animateNumber(), 50);
  }

  animateNumber() {
    if (this.animatedNumber < this.numOfLessons) {
      this.animatedNumber++;
    } else {
      return;
    }
  }

  courseUrl: string;
  courses: Array<Course>;
  course: Course;
  numOfLessons: number;
  animatedNumber: number;
  detailsText: string;

  startCourse() {
    this.routeService.setRoute(
      this.course.type,
      this.courseUrl,
      this.course.lessons[0].url
    );
  }

  getNumberOfLessons(course: Course): number {
    let number = 0;
    if (course == null) {
      return number;
    }
    if (course.lessons != null) {
      course.lessons.forEach(function (lesson) {
        if (lesson != null && lesson.sublessons != null) {
          number += lesson.sublessons.length;
        } else {
          number++;
        }
      });
    }
    return number;
  }
}
