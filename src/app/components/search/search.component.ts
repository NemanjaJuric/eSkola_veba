import { Component, OnInit, ElementRef, trigger, transition, style, animate, state, keyframes } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';
import { Course } from '../../classes/course';
import { Lesson } from '../../classes/lesson';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  host: {
        '(document:click)': 'onClick($event)',
    },
    animations: [
        trigger('toggleSearch', [
            state('false', style({ width: '250px' })),
            state('true', style({ width: '400px' })),
            transition('* => *', animate('0.2s ease-in'))
        ]),
        trigger('toggleSearchResults', [
            transition('void => *', [animate(200, keyframes([
                style({ height: '0px' }),
                style({ height: '280px' }),
            ]))]),
            transition('* => void', [animate(200, keyframes([
                style({ height: '280px' }),
                style({ height: '0px' }),
            ]))])
        ])
    ]
})
export class SearchComponent implements OnInit {

  constructor(
        private router: Router,
        private schoolService: SchoolService,
        private routeService: RouteService,
        private el: ElementRef) { }

    private searchString: string;
    private courses: Array<Course>;
    private searchResult = [];
    private showSearchInd: boolean;
    private searchHistory = [];

    ngOnInit() {
        this.courses = this.schoolService.getCourses();
        this.resetSearch();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.resetSearch();
            }
        })
    }

    resetSearch() {
        this.searchResult = [];
        this.searchString = "";
        this.showSearchInd = false;
        if (localStorage.getItem('searchHistory') != undefined) {
            this.searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        }
    }

    onClick(event) {
        if (event.target.className.indexOf('search-input') >= 0) {
            this.showSearchInd = true;
        } else {
            this.showSearchInd = false;
        }
    }

    initSearch() {
        this.searchResult = [];
        if (this.searchString.length === 0) {
            this.searchResult = [];
            return;
        }
        if (this.courses != null) {
            this.search(this.courses, this.searchString);
            this.courses.forEach(course => {
                if (course.lessons != null) {
                    this.search(course.lessons, this.searchString);
                    course.lessons.forEach(lesson => {
                        if (lesson.sublessons != null) {
                            this.search(lesson.sublessons, this.searchString);
                            this.searchResult.forEach(s => {
                                if (s.name === lesson.name) {
                                    this.searchResult = this.searchResult.concat(lesson.sublessons);
                                }
                            });
                        }
                    })
                }
            });
        }
        this.distinctSearchResult();
        localStorage.setItem('searchHistory', JSON.stringify(this.searchResult));
    }

    search(target: Array<any>, searchString: string) {
        this.searchResult = this.searchResult.concat(target.filter((item) => {
            if (item.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
                return item;
            }
        }))
    }

    distinctSearchResult() {
        this.searchResult = this.searchResult.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
    }

    setRoute(page, course, lesson) {
        this.routeService.setRoute(page, course, lesson);
    }

}
