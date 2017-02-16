import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  constructor(private router: Router, private routeService: RouteService) { }

    ngOnInit() {
        this.setTheme(this.routeService.course);
        this.router.events.subscribe((event) => {
            this.closeButton.nativeElement.click();
            if (event instanceof NavigationEnd && this.routeService.course != null && this.routeService.lesson != null) {
                this.setTheme(this.routeService.course);
            }
        });
    }

    @ViewChild('closeButton') closeButton: ElementRef;

    private theme: string;

    setTheme(course) {
        if (course != null) {
            this.theme = course;
        } else {
            this.theme = 'home';
        }
    }

    @Input() lessonHelp: string;

}
