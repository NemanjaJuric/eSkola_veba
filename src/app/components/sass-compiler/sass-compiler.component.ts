import { Component, OnInit } from '@angular/core';
import '../../../libs/sass/sass.js';

declare var Sass: any;

@Component({
  selector: 'sass-compiler',
  templateUrl: './sass-compiler.component.html'
})
export class SassCompilerComponent {

  constructor() { }

    private sassCode: string;
    private cssCode: string;

    click(event): void {
        if (event.page != 'sass-compiler') {
            return;
        }
        switch (event.func) {
            case 'runCompiler':
                this.compile();
                break;
        }

    }

    compile(): void {
        var sass = new Sass();
        var this_ = this;
        sass.compile(this.sassCode, function (result) {
            this_.cssCode = result.text;
        });
    }

}
