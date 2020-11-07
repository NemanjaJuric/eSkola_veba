// Uključujemo modul http i definišemo promenljivu
// http u kojoj čuvamo instancu modula
var http = require("http");

http
  .createServer(function (zahtev, odgovor) {
    // Prvo se šalje HTTP zaglavlje
    // HTTP Status: 200 : OK
    // Content-type: text/plain (tip sadržaja, prazan tekst)
    odgovor.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    // Šaljemo telo odgovora, tj. poruku kojom pozdravljamo korisnika
    odgovor.end("Dobrodošli na elektronski kurs NodeJS\n");
  })
  .listen(8081);

// Definišemo poruku koja će biti ispisana
// nakon pokretanja servera
console.log("Serveru se pristupa uz pomoć adrese http://127.0.0.1:8081/");
