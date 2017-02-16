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
        this.courses = this.getCourses();
        this.technologies = this.getTechnologies();
        window.scrollTo(0, 0);
    }

    private courses: Array<Course>;
    private technologies: Array<Technologie>;

    getCourses(): Array<Course> {
        return this.schoolService.getCourses();
    }
    
    getTechnologies(): Array<Technologie> {
        return this.schoolService.getTechnologies();
    }

    setRoute(page, course, lesson): void {
        this.routeService.setRoute(page, course, lesson);
    }

}
