// učitavamo modul fl i čuvamo njegovu instancu u promenljivoj fs
var fs = require("fs");

// ispisujemo poruku na serveru
console.log("Otvaramo fajl ulaz.txt");

// asinhrono čitamo sadržaj fajla
// u okviru poziva funkcije definišemo povratni poziv koji će
// se izvršiti nakon čitanja fajla
fs.readFile("ulaz.txt", function (err, data) {
  console.log("Asinhrono čitanje završeno.");

  // proveravamo da li se desila greška prilikom otvaranja
  // ili čitanja fajla
  if (err) {
    // štampamo poruku o grešci
    return console.error(err);
  }

  // Sadržaj fajla je:
  console.log(data.toString());
});

console.log("Program se završio.");
