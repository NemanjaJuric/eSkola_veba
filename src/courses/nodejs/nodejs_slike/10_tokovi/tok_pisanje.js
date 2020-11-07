// uključujemo modul fs
var fs = require("fs");
// definišemo sadržaj koji upisujemo u fajl
var data = "Elektronski kurs NodeJS";

// kreiramo tok za pisanje
var writerStream = fs.createWriteStream("output.txt");

// postavljamo kodnu šemu na toku
writerStream.write(data, "UTF8");

// zatvaramo fajl
writerStream.end();

// toku pridružujemo finish događaj i definišemo rukovalac događajima
writerStream.on("finish", function () {
  // kada smo ispisali celokupan sadržaj bafera u fajl, prikazaćemo poruku na konzoli
  console.log("Upisivanje završšeno");
});

// toku pridružujemo error događaj i definišemo rukovalac događajima
writerStream.on("error", function (err) {
  // u slučaju da se desi greška na toku, prikazaćemo korisniku opis te greške
  console.log(err.stack);
});

console.log("Kraj programa.");
