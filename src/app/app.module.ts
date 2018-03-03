import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CodemirrorModule } from 'ng2-codemirror';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BookComponent } from './components/book/book.component';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';
import { CourseComponent } from './components/course/course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { EditorComponent } from './components/editor/editor.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LessonsInputComponent } from './components/lessons-input/lessons-input.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SassCompilerComponent } from './components/sass-compiler/sass-compiler.component';
import { SearchComponent } from './components/search/search.component';
import { TsCompilerComponent } from './components/ts-compiler/ts-compiler.component';
import { WebCenterComponent } from './components/web-center/web-center.component';

import { RouteService } from './services/route.service';
import { SchoolService } from './services/school.service';
import { CodeRunnerService } from './services/code-runner.service';
import { GoogleAnalyticsService } from './services/google-analytics.service';

import { SanitizerPipe } from './pipes/sanitizer.pipe';

const routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'course/:id/:url',
    component: CourseComponent
  },
  {
    path: 'book/:id/:url',
    component: BookComponent
  },
  {
    path: 'web-center',
    component: WebCenterComponent,
  },
  {
    path: 'ts-compiler',
    component: TsCompilerComponent,
  },
  {
    path: 'sass-compiler',
    component: SassCompilerComponent,
  },
  {
    path: 'lessons-input',
    component: LessonsInputComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BookComponent,
    BottomNavigationComponent,
    CourseComponent,
    CourseDetailsComponent,
    EditorComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LessonsInputComponent,
    MenuComponent,
    ModalComponent,
    NavigationComponent,
    PageNotFoundComponent,
    SassCompilerComponent,
    SearchComponent,
    TsCompilerComponent,
    WebCenterComponent,
    SanitizerPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    CodemirrorModule,
    ColorPickerModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, 
    RouteService, 
    SchoolService, 
    CodeRunnerService,
    GoogleAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
