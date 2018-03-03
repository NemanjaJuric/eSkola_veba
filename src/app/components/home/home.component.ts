import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../../classes/course';
import { Technologie } from '../../classes/technologie';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private schoolService: SchoolService, private routeService: RouteService) { };

    ngOnInit() {
        this.getCourses();
        this.getTechnologies();
        window.scrollTo(0, 0);
    }

    courses: Array<Course>;
    technologies: Array<Technologie>;

    getCourses(): void {
        this.schoolService.getCourses().subscribe(data => this.courses = data);
    }

    getTechnologies(): void {
        this.schoolService.getTechnologies().subscribe(data => this.technologies = data);
    }

    setRoute(page, course, lesson): void {
        this.routeService.setRoute(page, course, lesson);
    }

}
