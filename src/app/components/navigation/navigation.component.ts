import { Component, OnInit, HostListener, trigger, transition, style, animate, state, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { Course } from '../../classes/course';
import { MenuComponent } from '../menu/menu.component';
import { RouteService } from '../../services/route.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {

    url: string;
    pageUrl: string;
    courseUrl: string;
    lessonUrl: string;
    navigationBackground: String;
    navigationShadow: boolean;
    menuIcon: boolean;
    course: Course;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private schoolService: SchoolService, private router: Router, private routeService: RouteService, private elmRef: ElementRef) { };

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.initComponent();
            }
        });
        this.initComponent();
    }

    ngOnDestroy() {
        this._destroy$.next();
    }

    initComponent() {
        this.menu.showMenu = false;
        this.menuIcon = this.menu.showMenu;
        this.url = this.routeService.url;
        this.pageUrl = this.routeService.page;
        this.courseUrl = this.routeService.course;
        this.lessonUrl = this.routeService.lesson;
        if (this.pageUrl === 'home') {
            this.navigationBackground = 'bkg-home';
        } else if (this.pageUrl === 'about') {
            this.navigationBackground = 'bkg-about';
        } else if (this.pageUrl === 'web-center') {
            this.navigationBackground = 'bkg-web-center';
        } else if (this.pageUrl === 'ts-compiler') {
            this.navigationBackground = 'bkg-ts';
        } else if (this.pageUrl === 'sass-compiler') {
            this.navigationBackground = 'bkg-sass';
        } else {
            this.navigationBackground = 'bkg-' + this.courseUrl;
        }
        if (this.courseUrl) {
            this.schoolService.getCourseByUrl(this.courseUrl)
                .takeUntil(this._destroy$)
                .subscribe(c => {
                    this.course = c;
                    console.log(this.course)
                })
        }
    }



    @ViewChild(MenuComponent) menu: MenuComponent;

    setRoute(page, course, lesson, lessonObj) {
        if (lessonObj && lessonObj.sublessons) {
            this.routeService.setRoute(page, course, lessonObj.sublessons[0].url);
            return;
        }
        this.routeService.setRoute(page, course, lesson);
    }

    @HostListener('window:scroll', ['$event'])
    makeShadow(event) {
        document.body.scrollTop > 10 ? this.navigationShadow = true : this.navigationShadow = false;
    }


}
