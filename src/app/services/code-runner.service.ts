import { Injectable } from "@angular/core";
import "../../libs/sass/sass.js";

declare var $: any;
declare var alasql: any;
declare var Sass: any;

@Injectable()
export class CodeRunnerService {
  constructor() {}

  run(preview, code, lang) {
    if (lang === "php") {
      this.previewPHPCode(preview, code);
    } else if (lang === "ts") {
      this.previewTSCode(preview, code);
    } else if (lang === "sql") {
      this.previewSQLCode(preview, code);
    } else if (lang === "sass") {
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
      },
    });
  }

  private previewTSCode(preview, code) {
    this.setInputStorage(code);
    this.compile();
    var out = localStorage.getItem("output");
    if (preview.window.document.body.hasChildNodes) {
      var body = preview.window.document.getElementsByTagName("body")[0];
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
    localStorage.setItem("input", code);
  }

  clearStorage() {
    localStorage.removeItem("input");
    localStorage.removeItem("output");
  }

  private compile() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "javaScript";
    var scriptString = `
            tsc();
        `;
    script.innerHTML = scriptString;
    document.body.appendChild(script);
    setTimeout(
      () => document.body.removeChild(document.getElementById("javaScript")),
      200
    );
  }

  private previewSQLCode(preview, code) {
    let tables = alasql("SHOW TABLES FROM alasql");
    if (tables.length === 0) {
      this.makeDefaultTables();
    }
    let res = null;
    let lines = code.split("\n");
    lines = lines.filter((l) => l !== "");
    for (let i = 0; i < lines.length; i++) {
      if (i !== lines.length - 1) {
        alasql(lines[i]);
      } else {
        res = alasql(lines[i]);
      }
    }
    preview.window.document.write(this.makeTable(res));
  }

  private makeDefaultTables() {
    alasql(`
    CREATE TABLE kupac (id_kupca INT NOT NULL AUTO_INCREMENT, ime VARCHAR(20) NOT NULL, prezime VARCHAR(50) NOT NULL, grad VARCHAR(30) NOT NULL, ulica VARCHAR(50) NOT NULL, broj INT NOT NULL, PRIMARY KEY (\`id_kupca\`));

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (1, 'Janko', 'Ivankovic', 'Beograd', 'Glavna', 31);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (2, 'Jovana', 'Pavlovic', 'Beograd', 'Velika', 17);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (3, 'Dejana', 'Avramovic', 'Beograd', 'Mala', 137);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (4, 'Veljko', 'Bojanic', 'Beograd', 'Peta', 82);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (5, 'Filip', 'Spasojevic', 'Beograd', 'Prva', 22);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (6, 'Irena', 'Mirkovic', 'Novi Sad', 'Savska', 1);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (7, 'Svetozar', 'Puzic', 'Novi Sad', 'Drinska', 132);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (8, 'Pavle', 'Gajic', 'Novi Sad', 'Dunavska', 70);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (9, 'Marko', 'Obradovic', 'Novi Sad', 'Moravska', 93);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (10, 'Darko', 'Ivanovic', 'Novi Sad', 'Kolubarska', 36);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (11, 'Ivana', 'Djurkovic', 'Nis', 'Zlatiborska', 88);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (12, 'Ivan', 'Radivojevic', 'Nis', 'Fruskogorska', 103);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (13, 'Uros', 'Stankovic', 'Nis', 'Kopaonicka', 76);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (14, 'Aleksandar', 'Novakovic', 'Nis', 'Jablanicka', 18);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (15, 'Nikola', 'Gajic', 'Nis', 'Zlatarska', 3);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (16, 'Tanja', 'Pajic', 'Beograd', 'Glavna', 114);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (17, 'Darko', 'Teodorovic', 'Beograd', 'Prva', 39);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (18, 'Tatjana', 'Velickovic', 'Beograd', 'Treca', 26);

	INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (19, 'Bojan', 'Nenadovic', 'Novi Sad', 'Dunavska', 101);

  INSERT INTO kupac (id_kupca, ime, prezime, grad, ulica, broj) VALUES (20, 'Nenad', 'Radisic', 'Nis', 'Fruskogorska', 21);
  



  CREATE TABLE narudzbina (id_narudzbine INT NOT NULL AUTO_INCREMENT, kupac INT NOT NULL, prodavac INT NOT NULL, proizvod INT NOT NULL, kolicina INT NOT NULL, cena INT NOT NULL, datum DATE NULL, dostavio INT NOT NULL, PRIMARY KEY (\`id_narudzbine\`));

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (1, 2, 15, 1, 10, 11000, '2018-05-05', 1);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (2, 8, 8, 2, 10, 13000, '2018-05-10', 2);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (3, 13, 12, 2, 2, 2600, '2018-05-20', 3);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (4, 5, 13, 1, 4, 4400, '2018-04-08', 4);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (5, 17, 1, 2, 5, 6500, '2018-04-09', 4);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (6, 19, 18, 2, 5, 6500, '2018-04-13', 5);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (7, 7, 6, 1, 1, 1100, '2018-04-14', 5);
	
	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (8, 20, 11, 2, 1, 1300, '2018-03-01', 6);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (9, 11, 2, 2, 20, 26000, '2018-03-01', 6);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (10, 1, 22, 1, 100, 110000, '2017-10-08', 7);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (11, 18, 17, 2, 7, 9100, '2017-10-09', 7);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (12, 4, 20, 1, 7, 7700, '2017-10-08', 7);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (13, 16, 13, 1, 100, 110000, '2017-10-10', 7);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (14, 10, 4, 1, 100, 110000, '2018-06-10', 8);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (15, 6, 6, 2, 15, 19500, '2018-06-09', 8);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (16, 8, 18, 1, 1, 1100, '2018-06-11', 8);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (17, 15, 21, 2, 50, 65000, '2018-02-22', 9);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (18, 12, 2, 1, 50, 55000, '2018-02-23', 9);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (19, 14, 11, 2, 1, 1300, '2018-02-21', 9);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (20, 1, 1, 1, 200, 220000, '2017-05-21', 10);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (21, 2, 15, 1, 2, 2200, '2018-07-02', 11);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (22, 5, 22, 2, 1, 1300, '2018-07-02', 11);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (23, 2, 17, 1, 4, 4400, '2018-07-03', 11);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (24, 4, 20, 2, 3, 3900, '2018-07-02', 11);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (25, 18, 1, 1, 4, 4400, '2018-07-03', 11);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (26, 9, 8, 1, 2, 2200, '2018-03-25', 12);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (27, 7, 6, 2, 1, 1300, '2018-03-26', 12);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (28, 14, 11, 2, 1, 1300, '2018-01-26', 13);

	INSERT INTO narudzbina (id_narudzbine, kupac, prodavac, proizvod, kolicina, cena, datum, dostavio) VALUES (29, 12, 21, 1, 2, 2200, '2018-01-25', 13);






  CREATE TABLE proizvod (id_proizvoda INT NOT NULL AUTO_INCREMENT, naziv VARCHAR(40) NOT NULL, cena INT NOT NULL, PRIMARY KEY (\`id_proizvoda\`));

	INSERT INTO proizvod (id_proizvoda, naziv, cena) VALUES (1, 'Hrana za pse', 1100);

	INSERT INTO proizvod (id_proizvoda, naziv, cena) VALUES (2, 'Hrana za macke', 1300);





  CREATE TABLE radnik ( 
		id_radnika INT NOT NULL AUTO_INCREMENT,
		ime VARCHAR(20) NOT NULL,
		prezime VARCHAR(50) NOT NULL,
		plata INT NOT NULL,
		polozaj VARCHAR(30) NOT NULL,
		radno_mesto VARCHAR(30) NOT NULL,
		datum_zaposlenja DATE NULL,
		telefon VARCHAR(15) NULL,
		PRIMARY KEY (\`id_radnika\`)
	);



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






  CREATE TABLE sluzbeni_put (id_puta INT NOT NULL AUTO_INCREMENT, putnik INT NOT NULL, datum DATE NULL, PRIMARY KEY (\`id_puta\`));

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (1, 9, '2018-05-06');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (2, 3, '2018-05-11');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (3, 16, '2018-05-21');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (4, 19, '2018-04-10');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (5, 3, '2018-04-15');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (6, 16, '2018-03-01');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (7, 9, '2017-10-10');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (8, 3, '2018-06-11');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (9, 16, '2018-02-23');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (10, 19, '2017-05-21');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (11, 19, '2018-07-03');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (12, 3, '2018-03-26');

	INSERT INTO sluzbeni_put (id_puta, putnik, datum) VALUES (13, 16, '2018-01-26');
    `);
  }

  private makeTable(data) {
    if (!Array.isArray(data)) {
      return data;
    }
    let table =
      '<table style="border: 1px solid black; border-collapse: collapse; width: 100%;">';
    let row = data[0];
    let thead = "<thead>";
    table += thead;
    let tr = "<tr>";
    table += tr;
    for (let column in row) {
      let th = '<th style="border: 1px solid black;">';
      table += th;
      let text = column;
      table += text;
      let thClose = "</th>";
      table += thClose;
    }
    let trClose = "</tr>";
    table += trClose;
    let theadClose = "</thead>";
    table += theadClose;
    let tbody = "<tbody>";
    table += tbody;
    data.forEach((row) => {
      let tr = "<tr>";
      table += tr;
      for (let column in row) {
        let td = '<td style="border: 1px solid black;">';
        table += td;
        let text = row[column];
        table += text;
        let tdClose = "</td>";
        table += tdClose;
      }
      let trClose = "</tr>";
      table += trClose;
    });
    let tbodyClose = "</tbody>";
    table += tbodyClose;
    let tableClose = "</table>";
    table += tableClose;
    return table;
  }

  previewSassCode(preview = null, code, formatToHTML = false) {
    let sass = new Sass();
    sass.compile(code, function (result) {
      if (preview) {
        if (formatToHTML) {
          preview.window.document.write(
            result.text.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;")
          );
        } else {
          preview.window.document.write(result.text);
        }
      } else {
        return result.text;
      }
    });
  }
}
