import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { ColorPickerModule } from 'angular2-color-picker';
import { ColorPickerService } from 'angular2-color-picker';
import { SchoolService } from '../../services/school.service';
import { RouteService } from '../../services/route.service';
import { EditorComponent } from '../../components/editor/editor.component';

// import 'node_modules/jquery/dist/jquery.min.js';
// import 'node_modules/file-saver/FileSaver.min.js';

declare var $: any;
declare var saveAs: any;

@Component({
  selector: 'web-center',
  templateUrl: './web-center.component.html'
})
export class WebCenterComponent implements OnInit {

  constructor(
        private http: Http,
        private renderer: Renderer,
        private schoolService: SchoolService) { }

    ngOnInit() {
        if (localStorage.getItem('code') === null) {
            this.code = '';
            setInterval(() => localStorage.setItem('code', this.code), 1000);
        } else {
            this.code = localStorage.getItem('code');
            setInterval(() => localStorage.setItem('code', this.code), 1000);
        }
    }

    private func: string = 'editor';
    private color: string = "#607d8b";
    private code: string;
    private allowedExtensions: Array<string>;

    click(event) {
        if (event.page != 'web-center') {
            return;
        }
        this.func = event.func;
        if (this.func === 'view') {
            var preview = window.open("", "frame");
            if (this.code === undefined) return;
            if (this.code.indexOf('<?php') === 0) {
                $.ajax({
                    url: "http://phpfiddle.org/api/run/code/json",
                    type: "post",
                    data: "code=" + encodeURIComponent(this.code),
                    cache: false,
                    dataType: "json",
                    success: function (data) {
                        if (data.result) {
                            preview.window.document.write(data.result);
                        }
                        if (data.error) {
                            preview.window.document.write(data.result);
                        }
                    }
                })
            } else {
                preview.document.write(this.code === undefined ? '' : this.code);
                preview.document.close();
            }
        }


    }

    private inputText = "";

    latToCyr() {
        var text: string = this.inputText;
        var translitedText: string = "";
        var length: number = text.length;
        var letter: string;
        var i: number = 0;
        var ind: number = 0;
        while (i < length) {
            letter = text.charAt(i);
            ind = 0;
            if (text.charAt(i) == 'N') {
                if (text.charAt(i + 1) == 'J' || text.charAt(i + 1) == 'j') {
                    letter = 'Њ';
                    i += 1;
                    ind = 1;
                }
            }
            if (text.charAt(i) == 'n') {

                if (text.charAt(i + 1) == 'j') {
                    letter = 'њ';
                    i += 1;
                    ind = 1;
                }
            }
            if (text.charAt(i) == 'L') {

                if (text.charAt(i + 1) == 'J' || text.charAt(i + 1) == 'j') {
                    letter = 'Љ';
                    i += 1;
                    ind = 1;
                }
            }
            if (text.charAt(i) == 'l') {

                if (text.charAt(i + 1) == 'j') {
                    letter = 'љ';
                    i += 1;
                    ind = 1;
                }
            }
            if (text.charAt(i) == 'D') {
                if (text.charAt(i + 1) == 'Ž' || text.charAt(i + 1) == 'ž') {
                    letter = 'Џ';
                    i += 1;
                    ind = 1;
                }
            }
            if (text.charAt(i) == 'd') {

                if (text.charAt(i + 1) == 'ž') {
                    letter = 'џ';
                    i += 1;
                    ind = 1;
                }
            }
            if (ind != 1) {
                switch (letter) {
                    case 'A': letter = 'А'; break;
                    case 'B': letter = 'Б'; break;
                    case 'V': letter = 'В'; break;
                    case 'G': letter = 'Г'; break;
                    case 'D': letter = 'Д'; break;
                    case 'Đ': letter = 'Ђ'; break;
                    case 'E': letter = 'Е'; break;
                    case 'Ž': letter = 'Ж'; break;
                    case 'Z': letter = 'З'; break;
                    case 'I': letter = 'И'; break;
                    case 'J': letter = 'Ј'; break;
                    case 'K': letter = 'К'; break;
                    case 'L': letter = 'Л'; break;
                    case 'M': letter = 'М'; break;
                    case 'N': letter = 'Н'; break;
                    case 'O': letter = 'О'; break;
                    case 'P': letter = 'П'; break;
                    case 'R': letter = 'Р'; break;
                    case 'S': letter = 'С'; break;
                    case 'T': letter = 'Т'; break;
                    case 'Ć': letter = 'Ћ'; break;
                    case 'U': letter = 'У'; break;
                    case 'F': letter = 'Ф'; break;
                    case 'H': letter = 'Х'; break;
                    case 'C': letter = 'Ц'; break;
                    case 'Č': letter = 'Ћ'; break;
                    case 'Š': letter = 'Ш'; break;
                    case 'a': letter = 'а'; break;
                    case 'b': letter = 'б'; break;
                    case 'v': letter = 'в'; break;
                    case 'g': letter = 'г'; break;
                    case 'd': letter = 'д'; break;
                    case 'đ': letter = 'ђ'; break;
                    case 'e': letter = 'е'; break;
                    case 'ž': letter = 'ж'; break;
                    case 'z': letter = 'з'; break;
                    case 'i': letter = 'и'; break;
                    case 'j': letter = 'ј'; break;
                    case 'k': letter = 'к'; break;
                    case 'l': letter = 'л'; break;
                    case 'm': letter = 'м'; break;
                    case 'n': letter = 'н'; break;
                    case 'o': letter = 'о'; break;
                    case 'p': letter = 'п'; break;
                    case 'r': letter = 'р'; break;
                    case 's': letter = 'с'; break;
                    case 't': letter = 'т'; break;
                    case 'ć': letter = 'ћ'; break;
                    case 'u': letter = 'у'; break;
                    case 'f': letter = 'ф'; break;
                    case 'h': letter = 'х'; break;
                    case 'c': letter = 'ц'; break;
                    case 'č': letter = 'ч'; break;
                    case 'š': letter = 'ш'; break;
                }
            }
            translitedText = translitedText + letter;
            i += 1;
        }
        this.inputText = translitedText;
    }

    cyrToLat() {
        var text: string = this.inputText;
        var translitedText: string = "";
        var length: number = text.length;
        var letter: string;
        var i: number = 0;
        var ind: number = 0;
        while (i < length) {
            letter = text.charAt(i);
            switch (letter) {
                case 'А': letter = 'A'; break;
                case 'Б': letter = 'B'; break;
                case 'В': letter = 'V'; break;
                case 'Г': letter = 'G'; break;
                case 'Д': letter = 'D'; break;
                case 'Ђ': letter = 'Đ'; break;
                case 'Е': letter = 'E'; break;
                case 'Ж': letter = 'Ž'; break;
                case 'З': letter = 'Z'; break;
                case 'И': letter = 'I'; break;
                case 'Ј': letter = 'J'; break;
                case 'К': letter = 'K'; break;
                case 'Л': letter = 'L'; break;
                case 'Љ': letter = 'Lj'; break;
                case 'М': letter = 'M'; break;
                case 'Н': letter = 'N'; break;
                case 'Њ': letter = 'Nj'; break;
                case 'О': letter = 'O'; break;
                case 'П': letter = 'P'; break;
                case 'Р': letter = 'R'; break;
                case 'С': letter = 'S'; break;
                case 'Т': letter = 'T'; break;
                case 'Ћ': letter = 'Ć'; break;
                case 'У': letter = 'U'; break;
                case 'Ф': letter = 'F'; break;
                case 'Х': letter = 'H'; break;
                case 'Ц': letter = 'C'; break;
                case 'Ч': letter = 'Č'; break;
                case 'Џ': letter = 'Dž'; break;
                case 'Ш': letter = 'Š'; break;
                case 'а': letter = 'a'; break;
                case 'б': letter = 'b'; break;
                case 'в': letter = 'v'; break;
                case 'г': letter = 'g'; break;
                case 'д': letter = 'd'; break;
                case 'ђ': letter = 'đ'; break;
                case 'е': letter = 'e'; break;
                case 'ж': letter = 'ž'; break;
                case 'з': letter = 'z'; break;
                case 'и': letter = 'i'; break;
                case 'ј': letter = 'j'; break;
                case 'к': letter = 'k'; break;
                case 'л': letter = 'l'; break;
                case 'љ': letter = 'lj'; break;
                case 'м': letter = 'm'; break;
                case 'н': letter = 'n'; break;
                case 'њ': letter = 'nj'; break;
                case 'о': letter = 'o'; break;
                case 'п': letter = 'p'; break;
                case 'р': letter = 'r'; break;
                case 'с': letter = 's'; break;
                case 'т': letter = 't'; break;
                case 'ћ': letter = 'ć'; break;
                case 'у': letter = 'u'; break;
                case 'ф': letter = 'f'; break;
                case 'х': letter = 'h'; break;
                case 'ц': letter = 'c'; break;
                case 'ч': letter = 'č'; break;
                case 'џ': letter = 'dž'; break;
                case 'ш': letter = 'š'; break;
            }
            translitedText = translitedText + letter;
            i += 1;
        }
        this.inputText = translitedText;
    }

    transliteration() {
        if (this.containsAny(this.inputText,
            ["Š", "š", "Č", "č", "Ć", "ć", "Đ", "đ", "Ž", "ž", "D", "d", "R", "r", "U", "u", "I", "i", "P", "p", "S", "s", "F", "f",
                "G", "g", "H", "h", "L", "l", "C", "c", "V", "v", "B", "b", "N", "n", "M", "m"])) {
            this.latToCyr();
        } else {
            this.cyrToLat();
        }
    }

    newDocumentTranslit() {
        this.inputText = '';
    }

    @ViewChild('fileInputTranslit') fileInputTranslit: ElementRef;

    openDocumentTranslit() {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
            this.fileInputTranslit.nativeElement, 'dispatchEvent', [event]);
    }

    inputDocumentTranslit(event) {
        var this_ = this;
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            this_.inputText = reader.result;
        };
        reader.readAsText(selectedFile);
    }

    saveDocumentTranslit() {
        var blob = new Blob([this.inputText], { type: "text/plain;charset=utf-8" });
        saveAs(blob, 'Transliterated' + ".txt");
    }

    containsAny(str, substrings) {
        for (var i = 0; i != substrings.length; i++) {
            var substring = substrings[i];
            if (str.indexOf(substring) != - 1) {
                return substring;
            }
        }
        return null;
    }

    private val1 = '16';
    private val2 = '16';
    private val3 = '1';
    private val4;
    private val5;
    private val6;
    private val7;
    private val8;
    private val9;

    convert(button) {
        switch (button) {
            case 2:
                this.val3 = (parseInt(this.val2) / parseInt(this.val1)).toPrecision(2);
                break;
            case 3:
                this.val2 = (parseInt(this.val3) * parseInt(this.val1)).toPrecision(2);
                break;
        }
        switch (button) {
            case 4:
                this.val5 = this.val4 * 10;
                this.val6 = this.val5 * 2.54;
                break;
            case 5:
                this.val4 = this.val5 / 10;
                this.val6 = this.val5 / 10 * 2.54;
                break;
            case 6:
                this.val4 = this.val6 / 2.54;
                this.val5 = this.val6 / 2.54 * 10;
                break;
        }
        switch (button) {
            case 7:
                this.val8 = this.val7 * 0.75;
                this.val9 = this.val7 * 0.0625;
                break;
            case 8:
                this.val7 = this.val8 / 0.075;
                this.val9 = this.val8 / 0.075 * 0.0625;
                break;
            case 9:
                this.val7 = this.val9 / 0.0625;
                this.val8 = this.val9 / 0.0625 * 0.75;
                break;
        }
    }

}
