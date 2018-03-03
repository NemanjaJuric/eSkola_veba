import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Course } from '../../classes/course';
import { Lesson } from '../../classes/lesson';
import { RouteService } from '../../services/route.service';
import { SchoolService } from '../../services/school.service';

declare var $: any;

@Component({
  selector: 'book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

  constructor(
    private schoolService: SchoolService,
    private routeService: RouteService,
    private router: Router,
    private elmRef: ElementRef
  ) { };

  previous: string;
  next: string;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.routeService.course != null && this.routeService.lesson != null) {
        this.initComponent();
      }
    });
    this.initComponent();
  }

  initComponent() {
    this.getLessonText(this.routeService.getCourseRoute());
    this.getLessonSiblings(this.routeService.lesson, this.routeService.course);
    this.scrollLesson();
  }

  scrollLesson() {
    $(this.elmRef.nativeElement).find('.lesson-text').scrollTop(0);
  }

  lessonText: string;

  getLessonText(url: string): void {
    this.schoolService.getLessonText(url)
      .subscribe(data => {
        this.lessonText = data;
      })
  }

  getLessonSiblings(lessonUrl: string, courseUrl: string) {
    let siblings: Array<Lesson>;
    this.schoolService.getLessonSiblings(lessonUrl, courseUrl).subscribe(data => {
      siblings = data;
      this.next = siblings[0] != null ? siblings[0].url : null;
      this.previous = siblings[1] != null ? siblings[1].url : null;
    });
  }

  click(event) {
    if (event.page != 'book') {
      return;
    }
    switch (event.func) {
      case 'next':
        this.routeService.setRoute(this.routeService.page, this.routeService.course, this.next);
        break;
      case 'prev':
        this.routeService.setRoute(this.routeService.page, this.routeService.course, this.previous);
        break;
    }
  }

}
