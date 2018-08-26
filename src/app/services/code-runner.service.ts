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
    this.makeDefaultTables();
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

  private makeDefaultTables() {
    alasql(`
    CREATE TABLE radnik ( 
      id_radnika INT NOT NULL AUTO_INCREMENT,
      ime VARCHAR(20) NOT NULL,
      prezime VARCHAR(50) NOT NULL,
      plata INT NOT NULL,
      polozaj VARCHAR(30) NOT NULL,
      radno_mesto VARCHAR(30) NOT NULL,
      datum_zaposlenja DATE NULL,
      telefon VARCHAR(15) NULL);
  
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (1, 'Ivona', 'Jankovic', 39500, 'trgovac', 'Beograd', '2017-06-19', '0113256914');

      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (2, 'Pavle', 'Spasic', 41300, 'trgovac', 'Nis', '2017-04-25', '0187215302');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (3, 'Vojin', 'Markovic', 53400, 'vozac', 'Novi Sad', '2017-12-08', '0213068124');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (4, 'Jovan', 'Petovic', 41200, 'trgovac', 'Novi Sad', '2018-04-06', '0214580312');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (5, 'Marko', 'Pavic', 71200, 'sef prodavnice', 'Beograd', '2016-04-23', '0117210034');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (6, 'Milos', 'Ilic', 39200, 'trgovac', 'Novi Sad', '2017-07-25', '0216396452');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (7, 'Milica', 'Jovic', 69400, 'sef prodavnice', 'Nis', '2018-01-13', '0184522019');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (8, 'Paja', 'Maric', 38900, 'trgovac', 'Novi Sad', '2018-04-11', '02132008496');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (9, 'Vuk', 'Petrovic', 59100, 'vozac', 'Beograd', '2017-08-28', '0113987589');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (10, 'Mirko', 'Vojinovic', 124500, 'generalni direktor', 'Beograd', '2008-11-23', '0116369369');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (11, 'Marija', 'Jovovic', 42100, 'trgovac', 'Nis', '2018-01-03', '01819674258');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (12, 'Jovana', 'Urosevic', 39600, 'trgovac', 'Nis', '2017-08-02', '0189246381');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (13, 'Veselin', 'Markovic', 41400, 'trgovac', 'Beograd', '2018-03-29', '0114215367');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (14, 'Stefan', 'Popovic', 72600, 'sef prodavnice', 'Novi Sad', '2017-11-27', '0216342003');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, telefon) VALUES (15, 'Lazar', 'Tosic', 38800, 'trgovac', 'Beograd', '0110314251');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (16, 'Filip', 'Tadic', 67100, 'vozac', 'Nis', '2017-07-08', '0186311421');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (17, 'Ana', 'Spasic', 42100, 'trgovac', 'Beograd', '2018-06-06', '0114258998');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja) VALUES (18, 'Uros', 'Pavic', 38000, 'trgovac', 'Novi Sad', '2018-02-20');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (19, 'Tomislav', 'Popadic', 73400, 'vozac', 'Beograd', '2016-12-13', '0113103520');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (20, 'Svetlana', 'Savic', 40300, 'trgovac', 'Beograd', '2017-08-26', '0118462153');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (21, 'Mira', 'Ostojic', 38300, 'trgovac', 'Nis', '2018-06-20', '0184012403');
    
      INSERT INTO radnik (id_radnika, ime, prezime, plata, polozaj, radno_mesto, datum_zaposlenja, telefon) VALUES (22, 'Mina', 'Antic', 38800, 'trgovac', 'Beograd', '2017-08-03', '0116942015');
    `)

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
      } else {
        return result.text
      }
    });
  }

}
