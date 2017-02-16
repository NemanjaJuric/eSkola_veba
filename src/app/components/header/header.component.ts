import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Course } from '../../classes/course';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  animations: [
        trigger('headerState', [
            state('inactive', style({ transform: 'translatey(0)' })),
            state('active', style({ transform: 'translatey(500px)' })),
            transition('inactive => active', animate('0.5s ease-in'))
        ])
    ]
})
export class HeaderComponent implements OnInit {

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
        this.heading = "";
        this.logo = "";
        this.getCourseData();
        this.headerState = "inactive";
        let timer = TimerObservable.create(0);
        this.subscription = timer.subscribe(t => { this.headerState = 'active'; });
    }

    private url: string;
    private pageUrl: string;
    private courseUrl: string;
    private lessonUrl: string;
    private courses: Array<Course>;
    private course: Course;
    private heading: string;
    private logo: string;
    private headerState: string = "inactive";
    private subscription: any;
    private location = 'about'

    getCourseData(): void {
        this.courses = this.schoolService.getCourses();
        this.courses.forEach((course) => {
            if (course.id === this.courseUrl) {
                this.heading = course.name;
                this.logo = course.logo;
            }
        })
    }

}
