import { Component, OnInit, trigger, transition, style, animate, state } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../classes/course';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  animations: [
        trigger('toggleMenu', [
            state('false', style({ transform: 'translatey(0)' })),
            state('true', style({ transform: 'translatex(350px)' })),
            transition('* => *', animate('0.2s ease-in'))
        ])
    ]
})
export class MenuComponent implements OnInit {

  constructor(private schoolService: SchoolService, private routeService: RouteService, private router: Router) {};

    ngOnInit(){
        this.router.events.subscribe(() => {
            this.showMenu = false;
        });
        this.getCourses();
    }

    private courses: Array<Course>;
    private year: number = new Date().getFullYear();
    public showMenu: boolean;

    getCourses(): void {
        this.schoolService.getCourses().subscribe(data => this.courses = data);
    }

    setRoute(page, course, lesson): void {
        this.routeService.setRoute(page, course, lesson);
    }

}
