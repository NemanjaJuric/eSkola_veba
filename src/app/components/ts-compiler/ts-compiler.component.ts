import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';
import { EditorComponent } from '../../components/editor/editor.component';

declare var tsc: any;

@Component({
  selector: 'ts-compiler',
  templateUrl: './ts-compiler.component.html'
})
export class TsCompilerComponent implements OnInit, OnDestroy {

  constructor(
        private http: Http, 
        private routeService: RouteService,
        private router: Router) { }

    ngOnInit(){
        this.clearStorage();
    }

    tsCode: string;
    jsCode: string;
    allowedExtensions: Array<string> = ['.ts', '.js'];

    getOutputStorage() {
        if (localStorage.getItem('output') != null) {
            this.jsCode = localStorage.getItem('output');
        }
        localStorage.removeItem('output');
    }

    setInputStorage() {
        if(this.tsCode != null && this.tsCode.length > 0){
            localStorage.setItem('input', this.tsCode);
        }
    }

    clearStorage() {
        localStorage.removeItem('input');
        localStorage.removeItem('output');
    }

    click(event) {
        if (event.page != 'ts-compiler') {
            return;
        }
        switch (event.func) {
            case 'runCompiler':
                this.setInputStorage();
                this.compile();
                this.getOutputStorage();
                break;
            case 'openNewWindow':
                this.setInputStorage();
                this.compile();
                var preview = window.open("");
                var out = localStorage.getItem('output');
                var script = preview.window.document.createElement("script");
                script.textContent = out;
                preview.window.document.body.appendChild(script);
                break;
        }

    }

    compile() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.id = 'javaScript';
        var scriptString = `
            tsc();
        `;
        script.innerHTML = scriptString;
        document.body.appendChild(script);
        setTimeout(() => document.body.removeChild(document.getElementById('javaScript')), 200);
    }

    ngOnDestroy(){
        this.clearStorage();
    }

}
