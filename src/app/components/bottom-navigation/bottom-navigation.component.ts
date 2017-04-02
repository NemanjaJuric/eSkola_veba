import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Button } from '../../classes/button';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'bottom-navigation',
  templateUrl: './bottom-navigation.component.html'
})
export class BottomNavigationComponent implements OnInit {

  constructor(private schoolService: SchoolService, private routeService: RouteService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initComponent();
      }
    });
  }

  initComponent() {
    this.page = this.routeService.page;
    this.schoolService.getCourseButtons().subscribe(data => this.courseButtons = data);
    this.schoolService.getBookButtons().subscribe(data => this.bookButtons = data);
    this.schoolService.getTSCompilerButtons().subscribe(data => this.tsCompilerButtons = data);
    this.schoolService.getWebCenterButtons().subscribe(data => this.webCenterButtons = data);
    this.schoolService.getSASSCompilerButtons().subscribe(data => this.sassCompilerButtons = data);
    this.schoolService.getLessonsInputButtons().subscribe(data => this.lessonsInputButtons = data);
  }

  private courseButtons: Array<Button>;
  private bookButtons: Array<Button>;
  private webCenterButtons: Array<Button>;
  private tsCompilerButtons: Array<Button>;
  private sassCompilerButtons: Array<Button>;
  private lessonsInputButtons: Array<Button>;
  private page: string;
  private activeTool: string = 'editor';

  @Output() clickEmit: EventEmitter<any> = new EventEmitter();

  click(page, func) {
    this.clickEmit.emit({
      page: page,
      func: func
    })
    this.setActiveTool(page, func);
  }

  setActiveTool(page, func) {
    if (page === 'web-center') {
      this.activeTool = func;
    }
  }

}
