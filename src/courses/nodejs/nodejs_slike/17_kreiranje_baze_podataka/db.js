// uključujemo mysql modul
var mysql = require('mysql');

// kreiramo objekat kojim opisujemo konekciju
var con = mysql.createConnection({
  host: "localhost",    
  user: "root",
  password: "",
  database: "knjige"
});

// asinhrono se povezujemo sa SUBP
con.connect(function(err) {
  // proveravamo da li se desila greška
  if (err) 
    // štampamo poruku o grešci i prekidamo izvrđavanje
    return console.log(err);
   
  // u slučaju uspešnog konektovanja štampamo poruku o uspehu
  console.log("Uspešno povezivanje!");
  
  // kreiramo sql upit kojim kreiramo tabelu korisnik
  var sql = 'CREATE Table knjige.korisnik (\
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\
    `kor_ime` VARCHAR(64) NOT NULL,\
    `sifra` VARCHAR(64) NOT NULL,\
    `mejl` VARCHAR(64) NOT NULL,\
    `ime` VARCHAR(64) NOT NULL,\
    `prezime` VARCHAR(64) NOT NULL,\
    `godiste` INT UNSIGNED NOT NULL,\
    PRIMARY KEY(`id`), \
    UNIQUE(`kor_ime`), \
    UNIQUE(`mejl`)\
    )';
  
  // asinhrono šaljemo upit SUBP
  con.query(sql, function(err, result) {
      // proveravamo da li se desila greška
      if (err) 
         // štampamo poruku o grešci i prekidamo izvrđavanje
         return console.log(err);
      
      // štampamo poruku o uspehu
      console.log("Tabela korisnik uspesno kreirana!");
      
      // definišemo upit kojim se kreira tabela knjiga
      sql = 'CREATE Table knjige.knjiga (\
         `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
         `naslov` VARCHAR(128) NOT NULL,\
         `autor` VARCHAR(128) NOT NULL,\
         `izdavac` VARCHAR(64) NOT NULL,\
         `zanr` VARCHAR(64) NOT NULL,\
         `god_izdanja` INT UNSIGNED NOT NULL,\
         `br_str` INT UNSIGNED NOT NULL, \
         `tiraz` INT UNSIGNED NOT NULL, \
         PRIMARY KEY(`id`)\
         )';
      
      // asinhrono šaljemo upit SUBP
      con.query(sql, function(err, result) {
         // proveravamo da li se desila greška
         if (err) 
             // štampamo poruku o grešci i prekidamo izvrđavanje
             return console.log(err);
      
         // štampamo poruku o uspehu
         console.log("Tabela knjiga uspesno kreirana!");
      });
  });
});