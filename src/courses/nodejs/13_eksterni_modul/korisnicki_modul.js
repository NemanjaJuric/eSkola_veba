// uključujemo modul
var moj_modul = require("./moj_modul");

var str1 = "NodeJS je ";
var str2 = "lak i zanimljiv";

// testiramo funkciju iz modula
var nadovezani = nadoveziStr(str1, str2);

// prikazujemo rezultat izvrsavanja
console.log("Rezultat nadovezivanja: " + nadovezani);
