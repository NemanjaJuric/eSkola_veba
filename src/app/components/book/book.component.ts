import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Course } from '../../classes/course';
import { RouteService } from '../../services/route.service';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

  constructor(private schoolService: SchoolService, private routeService: RouteService) { };

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    this.courseUrl = this.routeService.course;
    this.getBookLessonText(this.courseUrl);
  }

  private courseUrl: string;
  private lessonText: string;

  getBookLessonText(url: string): void {
    this.schoolService.getBookLessonText(url)
      .subscribe(data => {
        this.lessonText = data;
      })
  }

}
