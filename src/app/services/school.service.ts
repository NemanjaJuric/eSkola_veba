import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  Request,
  RequestOptions,
  RequestMethod,
} from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Course } from "../classes/course";
import { Lesson } from "../classes/lesson";
import { Person } from "../classes/person";
import { Technologie } from "../classes/technologie";
import { Button } from "../classes/button";
import "rxjs/Rx";
import { QueueScheduler } from "rxjs/scheduler/QueueScheduler";
import { forkJoin } from "rxjs/observable/forkJoin";
import { BoundDirectivePropertyAst } from "@angular/compiler";

declare const MathJax: any;

const assetsLocation = "assets/";
const coursesLocation = "courses/";
const testsLocation = "tests/";
const dataStoreLocation = "data/";

@Injectable()
export class SchoolService {
  constructor(private http: Http) {}

  private extractData(res: Response) {
    let body = res.text();
    return body || "";
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || "";
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  activateMathjax() {
    const t = setTimeout(() => {
      MathJax.typeset();
      clearTimeout(t);
    });
  }

  getLessonText(url: string): Observable<string> {
    let getUrl = coursesLocation + url + ".html";
    return this.http.get(getUrl).map(this.extractData).catch(this.handleError);
  }

  getLessonCode(url: string): Observable<string> {
    let getUrl = coursesLocation + url + "_primer.html";
    return this.http.get(getUrl).map(this.extractData).catch(this.handleError);
  }

  getLessonHelp(url: string): Observable<string> {
    let getUrl = coursesLocation + url + "_pomoc.html";
    return this.http.get(getUrl).map(this.extractData).catch(this.handleError);
  }

  getTestText(url: string): Observable<string> {
    let getUrl = testsLocation + url + ".html";
    return this.http.get(getUrl).map(this.extractData).catch(this.handleError);
  }

  getLessonSiblings(
    lessonUrl: string,
    courseUrl: string
  ): Observable<Array<Lesson>> {
    let allLessons: Array<Lesson> = [];
    let currentCourse: Course;
    let nextLesson: Lesson = null;
    let previousLesson: Lesson = null;
    let courses: Array<Course>;
    let getUrl = dataStoreLocation + "courses.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        courses = JSON.parse(res.text());
        courses.forEach((course) => {
          if (course.id === courseUrl) {
            currentCourse = course;
          }
        });
        if (currentCourse.lessons != null) {
          currentCourse.lessons.forEach((lesson) => {
            if (lesson.url != null || lesson.sublessons != null) {
              if (lesson.sublessons != null) {
                allLessons = allLessons.concat(lesson.sublessons);
              } else {
                allLessons = allLessons.concat(lesson);
              }
            }
          });
        }
        allLessons.forEach((lesson, index, all) => {
          if (lesson.url === lessonUrl) {
            nextLesson =
              all[index + 1] != undefined ? all[index + 1] : all[index];
            previousLesson =
              all[index - 1] != undefined ? all[index - 1] : all[index];
          }
        });
        return [nextLesson, previousLesson];
      })
      .catch(this.handleError);
  }

  getPersons(): Observable<Array<Person>> {
    let getUrl = dataStoreLocation + "persons.json";
    return this.http
      .get(getUrl)
      .map((res) => JSON.parse(res.text()))
      .catch(this.handleError);
  }

  getCourses(): Observable<Array<Course>> {
    let getUrl = dataStoreLocation + "courses.json";
    return this.http
      .get(getUrl)
      .map((res) => JSON.parse(res.text()))
      .catch(this.handleError);
  }

  getSections(): Observable<Array<any>> {
    let getUrl = dataStoreLocation + "sections.json";
    return this.http
      .get(getUrl)
      .map((res) => JSON.parse(res.text()))
      .catch(this.handleError);
  }

  getCourse(_course: string): Observable<Course> {
    let getUrl = dataStoreLocation + "courses.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let courses = JSON.parse(res.text());
        let course = courses.find((course) => {
          return course.id === _course;
        });
        return course;
      })
      .catch(this.handleError);
  }

  getCourseButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["courseButtons"];
      })
      .catch(this.handleError);
  }

  getBookButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["bookButtons"];
      })
      .catch(this.handleError);
  }

  getWebCenterButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["webCenterButtons"];
      })
      .catch(this.handleError);
  }

  getTSCompilerButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["tsCompilerButtons"];
      })
      .catch(this.handleError);
  }

  getSASSCompilerButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["sassCompilerButtons"];
      })
      .catch(this.handleError);
  }

  getLessonsInputButtons(): Observable<Array<Button>> {
    let getUrl = dataStoreLocation + "buttons.json";
    return this.http
      .get(getUrl)
      .map((res) => {
        let buttons = JSON.parse(res.text());
        return buttons["lessonsInputButtons"];
      })
      .catch(this.handleError);
  }

  getTechnologies(): Observable<Array<Technologie>> {
    let getUrl = dataStoreLocation + "technologies.json";
    return this.http
      .get(getUrl)
      .map((res) => JSON.parse(res.text()))
      .catch(this.handleError);
  }

  getCourseByUrl(courseUrl: string) {
    return this.getCourses().map((courses) => {
      return courses.find((c) => c.id === courseUrl);
    });
  }

  getTests() {
    let getUrl = dataStoreLocation + "tests.json";
    return this.http
      .get(getUrl)
      .map((res) => JSON.parse(res.text()))
      .catch(this.handleError);
  }

  getQuestions(
    testUrl: string,
    qustions: Array<number>
  ): Observable<Array<string>> {
    const batch = [];
    let getUrl = testsLocation + testUrl + "/";
    qustions.forEach((q) => {
      batch.push(
        this.http
          .get(getUrl + q + ".html")
          .map(this.extractData)
          .catch(this.handleError)
      );
    });
    return forkJoin(batch);
  }
}
