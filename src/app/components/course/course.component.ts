import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { SchoolService } from "../../services/school.service";
import { RouteService } from "../../services/route.service";
import { CodeRunnerService } from "../../services/code-runner.service";
import { Course } from "../../classes/course";
import { Lesson } from "../../classes/lesson";
import { EditorComponent } from "../../components/editor/editor.component";
import { LessonsInputComponent } from "../lessons-input/lessons-input.component";
import { Subscription } from "rxjs/Rx";

declare var $: any;

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
})
export class CourseComponent implements OnInit, OnDestroy {
  constructor(
    private schoolService: SchoolService,
    private routeService: RouteService,
    private codeRunnerService: CodeRunnerService,
    private router: Router,
    private elmRef: ElementRef
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.routeService.course != null &&
        this.routeService.lesson != null
      ) {
        this.initComponent();
      }
    });
    this.initComponent();
  }

  ngOnDestroy() {
    this.codeRunnerService.clearStorage();
    this.routerSubscription.unsubscribe();
  }

  initComponent() {
    this.getLesson(this.routeService.getCourseRoute());
    this.course = this.routeService.course;
    this.getExtension(this.course);
    this.getLessonSiblings(this.routeService.lesson, this.routeService.course);
  }

  course: string;
  lesson: Lesson;
  previous: string;
  next: string;
  jsCode: string;
  allowedExtensions: Array<string> = [];
  routerSubscription: Subscription;

  @Input() lessonText;
  @Input() code: string;
  @Input() lessonHelp: string;

  getExtension(course) {
    switch (course) {
      case "ts":
        this.allowedExtensions[0] = ".ts";
        break;
      default:
        this.allowedExtensions[0] = ".html";
        break;
    }
  }

  getLesson(url: string) {
    if (url != null) {
      this.getLessonText(url);
      this.getLessonCode(url);
      this.getLessonHelp(url);
      this.scrollLesson();
    }
  }

  scrollLesson() {
    $(this.elmRef.nativeElement).find(".lesson-text").scrollTop(0);
  }

  getLessonText(url: string) {
    this.schoolService.getLessonText(url).subscribe((data) => {
      this.lessonText = data;
    });
  }

  lessonClick(event) {
    if (event.toElement.className.indexOf("button_copy") >= 0) {
      let t = setTimeout(() => {
        this.code = event.toElement.previousElementSibling.textContent;
        this.previewCode(this.code, "frame");
        clearTimeout(t);
      }, 0);
    }
  }

  getLessonCode(url) {
    this.schoolService.getLessonCode(url).subscribe((data) => {
      this.code = data;
      this.previewCode(this.code, "frame");
    });
  }

  getLessonHelp(url: string) {
    this.schoolService.getLessonHelp(url).subscribe((data) => {
      this.lessonHelp = data;
    });
  }

  getLessonSiblings(lessonUrl: string, courseUrl: string) {
    let siblings: Array<Lesson>;
    this.schoolService
      .getLessonSiblings(lessonUrl, courseUrl)
      .subscribe((data) => {
        siblings = data;
        this.next = siblings[0] != null ? siblings[0].url : null;
        this.previous = siblings[1] != null ? siblings[1].url : null;
      });
  }

  makeIframe() {
    var iframe = document.createElement("iframe");
    iframe.name = "frame";
    iframe.style.backgroundColor = "white";
    document.getElementsByClassName("lesson-preview")[0].appendChild(iframe);
  }

  removeIframe() {
    if (document.getElementsByName("frame").length > 0) {
      document
        .getElementsByClassName("lesson-preview")[0]
        .removeChild(document.getElementsByName("frame")[0]);
    }
  }

  previewCode(code: string, iframeName: string, fullscreen?: boolean) {
    if (code.length === 0) {
      return;
    }
    this.removeIframe();
    this.makeIframe();
    if (fullscreen === undefined || fullscreen === false) {
      var preview = window.open("", iframeName);
    } else if (fullscreen === true) {
      var preview = window.open("");
    }
    this.codeRunnerService.run(preview, this.code, this.course);
    preview.window.document.close();
  }

  fullScreen: Boolean = false;

  fullscreen() {
    this.fullScreen = !this.fullScreen;
  }

  click(event) {
    if (event.page != "course") {
      return;
    }
    switch (event.func) {
      case "run":
        this.previewCode(this.code, "frame");
        break;
      case "open":
        this.fullscreen();
        break;
      case "next":
        this.routeService.setRoute(
          this.routeService.page,
          this.routeService.course,
          this.next
        );
        break;
      case "prev":
        this.routeService.setRoute(
          this.routeService.page,
          this.routeService.course,
          this.previous
        );
        break;
    }
  }
}
