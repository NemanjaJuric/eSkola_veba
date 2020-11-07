// uključujemo modul fs
var fs = require("fs");
// i kreiramo prazan bafer. znamo da su podaci koje čitamo tekstualni
// pa možemo da iskoristimo prazan string kao polazni bafer
var data = "";

// kreiramo tok za čitanje
var readerStream = fs.createReadStream("tok_citanje.txt");

// Spostavljamo kodnu šemu na ulaznom toku
readerStream.setEncoding("UTF8");

// toku pridružujemo data događaj i definišemo rukovalac događajima
readerStream.on("data", function (chunk) {
  // kada nam pristigne novo parce fajla, nadovezujemo ga na bafer
  data += chunk;
});

// toku pridružujemo end događaj i definišemo rukovalac događajima
readerStream.on("end", function () {
  // kada smo stigli do kraja toka, prikazaćemo na konzoli sadržaj fajla
  console.log("Sadržaj fajla: " + data);
});

// toku pridružujemo error događaj i definišemo rukovalac događajima
readerStream.on("error", function (err) {
  // u slučaju da se desi greška na toku, prikazaćemo korisniku opis te greške
  console.log(err.stack);
});

console.log("Kraj programa.");
