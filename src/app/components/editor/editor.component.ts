import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Course } from '../../classes/course';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/php/php';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/sass/sass';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/selection/active-line';

declare var saveAs: any;

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  constructor(
    private routeService: RouteService,
    private router: Router,
    private schoolService: SchoolService,
    private renderer: Renderer) { }

  ngOnInit() {
    this.initComponent();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.routeService.course != null && this.routeService.lesson != null) {
        this.initComponent();
      }
    });
  }

  initComponent() {
    let url = this.router.url;
    let routes = url.split("/");
    this.pageUrl = routes[1] != undefined ? routes[1] : null;
    this.courseUrl = routes[2] != undefined ? routes[2] : null;
    this.lesson = routes[3] != undefined ? routes[3] : null;
    this.schoolService.getCourse(this.courseUrl).subscribe(data => {
      this.course = data;
      this.setConfiguration(this.pageUrl, this.course);
      this.config['mode'] = this.lang;
      this.showCodeMirror = true;
    });
    this.documentName = this.lesson != null ? this.lesson : 'fajl';
    this.counter(this.code);
    this.config = {
      lineNumbers: true,
      autoCloseTags: true,
      styleActiveLine: true,
      autoCloseBrackets: true,
      matchTags: { bothTags: true },
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "F11": function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function (cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
    };
  }

  private editorCode: string;
  private config: Object;
  private wordCount: number;
  private lineCount: number;
  private pageUrl: string;
  private courseUrl: string;
  private course: Course;
  private lesson: string;
  private documentName: string;
  private extension: string;
  private fullScreen: boolean;
  private showCodeMirror: boolean = false;

  @Output() codeChange = new EventEmitter();

  @Input()
  set code(val) {
    this.editorCode = val;
    this.codeChange.emit(val);
  }
  get code() {
    return this.editorCode;
  }

  @Input() lang: string;
  @Input() displayLang: string;
  @Input() theme: string;
  @Input() allowedExtensions: Array<string> = [];

  setConfiguration(page, course) {
    this.fullScreen = false;
    if (page === 'course') {
      this.lang = course.lang;
      this.displayLang = course.displayLang;
      this.theme = course.id;
      if (course.id === 'ts') {
        this.allowedExtensions = ['.ts'];
      } else if (course.id === 'php') {
        this.allowedExtensions = ['.php']
      } else {
        this.allowedExtensions = ['.html', '.css', '.js'];
      }
    } else if (page === 'web-center') {
      this.lang = 'application/x-httpd-php';
      this.displayLang = 'HTML';
      this.theme = 'web-center';
      this.allowedExtensions = ['.html', '.css', '.js', '.php'];
    } else if (page === 'ts-compiler') {
      this.lang = 'application/typescript';
      this.allowedExtensions = ['.ts', '.js'];
    } else if (page === 'sass-compiler') {
      this.lang = 'text/x-sass';
      this.allowedExtensions = ['.sass', '.css'];
    } else {
      this.lang = 'application/x-httpd-php';
      this.displayLang = 'HTML';
      this.theme = 'home';
      this.allowedExtensions = ['.html', '.css', '.js', '.php', '.ts', '.sass'];
    }
    this.extension = this.allowedExtensions[0];
  }

  counter(code: string) {
    if (code != undefined) {
      if (code.length != 0) {
        this.wordCount = code.trim().split(/\s+/).length;
        this.lineCount = code.split(/\r\n|\r|\n/).length;
      } else {
        this.wordCount = 0;
        this.lineCount = 1;
      }
    } else {
      this.wordCount = 0;
      this.lineCount = 1;
    }
  }

  newDocument() {
    this.code = '';
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  openDocument() {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }

  inputDocument(event) {
    var this_ = this;
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      this_.code = reader.result;
    };
    reader.readAsText(selectedFile);
  }

  saveDocument() {
    var blob = new Blob([this.code], { type: "text/plain;charset=utf-8" });
    saveAs(blob, this.documentName + this.extension);
  }

}
