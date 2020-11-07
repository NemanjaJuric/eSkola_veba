// učitavamo modul fl i čuvamo njegovu instancu u promenljivoj fs
var fs = require("fs");

// ispisujemo poruku na serveru
console.log("Otvaramo fajl ulaz.txt");

// sinhrono čitamo sadržaj fajla
console.log("Sinhrono čitam fajl ulaz.txt");
var data = fs.readFileSync("ulaz.txt");

// Sadržaj fajla je:
console.log("Sinhrono čitanje završeno. Sadržaj fajla ulaz.txt: \n");
console.log(data.toString());

console.log("Program se završio.");
