import { Injectable } from '@angular/core';
import '../../libs/sass/sass.js';

declare var $: any;
declare var alasql: any;
declare var Sass: any;

@Injectable()
export class CodeRunnerService {

  constructor() { }

  run(preview, code, lang) {
    if (lang === 'php') {
      this.previewPHPCode(preview, code);
    } else if (lang === 'ts') {
      this.previewTSCode(preview, code);
    } else if (lang === 'sql') {
      this.previewSQLCode(preview, code);
    } else if (lang === 'sass') {
      this.previewSassCode(preview, code);
    } else {
      preview.window.document.write(code);
    }
  }

  private previewPHPCode(preview, code) {
    $.ajax({
      url: "http://phpfiddle.org/api/run/code/json",
      type: "post",
      data: "code=" + encodeURIComponent(code),
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
  }

  private previewTSCode(preview, code) {
    this.setInputStorage(code);
    this.compile();
    var out = localStorage.getItem('output');
    if (preview.window.document.body.hasChildNodes) {
      var body = preview.window.document.getElementsByTagName('body')[0];
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
    }
    var script = preview.window.document.createElement("script");
    script.textContent = out;
    preview.window.document.body.appendChild(script);
    this.clearStorage();
  }

  setInputStorage(code) {
    localStorage.setItem('input', code);
  }

  clearStorage() {
    localStorage.removeItem('input');
    localStorage.removeItem('output');
  }

  private compile() {
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

  private previewSQLCode(preview, code) {
    let tables = alasql('SHOW TABLES FROM alasql');
    tables.forEach(table => {
      alasql('DROP TABLE ' + table.tableid);
    });
    let res = null;
    let lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i !== lines.length - 1) {
        alasql(lines[i]);
      } else {
        res = alasql(lines[i])
      }
    }
    preview.window.document.write(this.makeTable(res));
  }

  private makeTable(data) {
    let table = '<table style="border: 1px solid black; border-collapse: collapse; width: 100%;">';
    let row = data[0];
    let thead = '<thead>';
    table += thead;
    let tr = '<tr>';
    table += tr;
    for (let column in row) {
      let th = '<th style="border: 1px solid black;">';
      table += th;
      let text = column;
      table += text;
      let thClose = '</th>';
      table += thClose;
    }
    let trClose = '</tr>';
    table += trClose;
    let theadClose = '</thead>';
    table += theadClose;
    let tbody = '<tbody>';
    table += tbody;
    data.forEach(row => {
      let tr = '<tr>';
      table += tr;
      for (let column in row) {
        let td = '<td style="border: 1px solid black;">';
        table += td;
        let text = row[column];
        table += text;
        let tdClose = '</td>';
        table += tdClose;
      }
      let trClose = '</tr>';
      table += trClose;
    });
    let tbodyClose = '</tbody>';
    table += tbodyClose;
    let tableClose = '</table>';
    table += tableClose;
    return table;
  }

  previewSassCode(preview = null, code, formatToHTML = false) {
    let sass = new Sass();
    sass.compile(code, function (result) {
      if (preview) {
        if (formatToHTML) {
          preview.window.document.write(result.text.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;'));
        } else {
          preview.window.document.write(result.text);
        }
      }else{
        return result.text
      }
    });
  }

}
