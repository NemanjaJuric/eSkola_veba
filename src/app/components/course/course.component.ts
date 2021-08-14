import { Component, OnInit, OnDestroy, ElementRef, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import "rxjs/Rx";
import { SchoolService } from "../../services/school.service";
import { RouteService } from "../../services/route.service";
import { CodeRunnerService } from "../../services/code-runner.service";
import { Lesson } from "../../classes/lesson";
import { Subscription } from "rxjs/Rx";

declare var $: any;

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
})
export class CourseComponent implements OnInit, OnDestroy {
  course: string;
  lesson: Lesson;
  previous: string;
  next: string;
  jsCode: string;
  allowedExtensions: Array<string> = [];
  routerSubscription: Subscription;

  showConsole = false;

  @Input() lessonText;
  @Input() code: string;
  @Input() lessonHelp: string;

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
      this.schoolService.activateMathjax();
    });
  }

  lessonClick(event) {
    if (event.srcElement.className.indexOf("button_copy") >= 0) {
      let t = setTimeout(() => {
        this.code = event.srcElement.previousElementSibling.textContent;
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
    document
      .getElementsByClassName("lesson-preview-content")[0]
      .appendChild(iframe);
    const iframeWindow = iframe.contentWindow as any;
    iframeWindow.console.print = (message) => {
      var logger = document.getElementById("console");
      if (!logger) {
        return;
      }
      if (typeof message == "object") {
        logger.innerHTML += JSON.stringify(message, null, 4) + "\n";
      } else {
        logger.innerHTML += message + "\n";
      }
    };
  }

  removeIframe() {
    if (document.getElementsByName("frame").length > 0) {
      document
        .getElementsByClassName("lesson-preview-content")[0]
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

  viewConsole(console: boolean) {
    this.showConsole = console;
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
