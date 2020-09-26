// Uključujemo modul http i definišemo promenljivu 
// http u kojoj čuvamo instancu modula
var http = require("http"); 

// kreiramo server koji će osluškivati port 8081
// prilikom kreiranja servera odmah vezujemo povratnu rutinu
// koja će se izvršiti kada klijent pokuša da pristupi portu 8081
http.createServer(function (zahtev, odgovor) {

   // telo povratne rutine 
   // u kojem ćemo obraditi zahtev i poslati odgovor
   //console.log(zahtev);
   
   // prikazujemo samo url, metod i http zaglavlje iz zahteva
   console.log(zahtev.url, zahtev.method, zahtev.headers);
   
   // kao tip sadržaja postavljamo tekstualni html
   odgovor.setHeader('Content-Type', 'text/html');
   
   // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
   odgovor.write('<html>');
   odgovor.write('<head><title>HTTP modul primeri</title></head>');
   odgovor.write('<body>');
   odgovor.write('<h1>Zdravo!</h1>');
   odgovor.write('</body>');
   odgovor.write('</html>');
   
   // na kraju je neohodno da pozovemo metod end nad objektom odgovor
   odgovor.end();
   
   // nakon poziva metoda end() ne smemo više da referišemo na objekat odgovor
   
}).listen(8081);

// Definišemo poruku koja će biti ispisana 
// nakon pokretanja servera
console.log('Serveru se pristupa uz pomoć adrese http://127.0.0.1:8081/');