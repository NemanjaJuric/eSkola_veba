var mysql = require("mysql");

function kreirajKonekciju() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "knjige",
  });

  return con;
}

function sveKnjigeUpit() {
  return "SELECT `naslov`, `autor`, `izdavac`, `zanr`, `god_izdanja`, `br_str`, `tiraz`, `id` FROM `knjiga`";
}

function knjigaUpit(id) {
  return (
    "SELECT `naslov`, `autor`, `izdavac`, `zanr`, `god_izdanja`, `br_str`, `tiraz`, `id` FROM `knjiga` WHERE id = " +
    id
  );
}

function unesiKorisnikaUpit(ime, prezime, kor_ime, sifra, mejl, godiste) {
  var upit =
    "INSERT INTO korisnik (kor_ime, sifra, mejl, ime, prezime, godiste) VALUES (";

  upit += "'" + kor_ime + "', ";
  upit += "'" + sifra + "', ";
  upit += "'" + mejl + "', ";
  upit += "'" + ime + "', ";
  upit += "'" + prezime + "', ";
  upit += godiste;
  upit += ")";

  return upit;
}

function unesiKnjigaUpit(naslov, autor, izdavac, zanr, god, br_str, tiraz) {
  var upit =
    "INSERT INTO `knjiga`(`naslov`, `autor`, `izdavac`, `zanr`, `god_izdanja`, `br_str`, `tiraz`) VALUES (";

  upit += "'" + naslov + "', ";
  upit += "'" + autor + "', ";
  upit += "'" + izdavac + "', ";
  upit += "'" + zanr + "', ";
  upit += god + ", ";
  upit += br_str + ", ";
  upit += tiraz;
  upit += ")";

  return upit;
}

function nadjiKorisnikaUpit(user, pass) {
  return (
    "SELECT * FROM korisnik WHERE kor_ime = '" +
    user +
    "' AND sifra = '" +
    pass +
    "'"
  );
}

function izmeniKnjiguUpit(
  naslov,
  autor,
  izdavac,
  zanr,
  god,
  br_str,
  tiraz,
  id
) {
  var upit = "UPDATE `knjiga` SET ";

  upit += "`naslov` = '" + naslov + "', ";
  upit += "`autor` = '" + autor + "', ";
  upit += "`izdavac` = '" + izdavac + "', ";
  upit += "`zanr` = '" + zanr + "', ";
  upit += "`god_izdanja` = " + god + ", ";
  upit += "`br_str` = " + br_str + ", ";
  upit += "`tiraz` = " + tiraz + " ";

  upit += "WHERE `id` = " + id;

  return upit;
}

function obrisiKnjiguUpit(id) {
  return "DELETE FROM `knjiga` WHERE `id` = " + id;
}

function izvrsiUpit(upit, resultCallback) {
  var con = kreirajKonekciju();

  con.connect(function (err) {
    if (err) {
      resultCallback(null);
      return;
    }

    console.log(upit);

    con.query(upit, function (err, result) {
      if (err) {
        resultCallback(null);
        return;
      }

      console.log(result);

      con.end(function (err) {
        resultCallback(result);
      });
    });
  });
}

module.exports.izvrsi = izvrsiUpit;
module.exports.sveKnjige = sveKnjigeUpit;
module.exports.unesiKorisnika = unesiKorisnikaUpit;
module.exports.nadjiKorisnika = nadjiKorisnikaUpit;
module.exports.unesiKnjigu = unesiKnjigaUpit;
module.exports.nadjiKnjigu = knjigaUpit;
module.exports.izmeniKnjigu = izmeniKnjiguUpit;
module.exports.obrisiKnjigu = obrisiKnjiguUpit;
