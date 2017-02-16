import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor(private schoolService: SchoolService, private router: Router, private routeService: RouteService) { };

  ngOnInit() {
    this.initComponent();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initComponent();
      }
    });
  }

  initComponent() {
    this.url = this.routeService.url;
    this.pageUrl = this.routeService.page;
    this.courseUrl = this.routeService.course;
    this.lessonUrl = this.routeService.lesson;
  }

  private url: string;
  private pageUrl: string;
  private courseUrl: string;
  private lessonUrl: string;
  private year = new Date().getFullYear();

}
