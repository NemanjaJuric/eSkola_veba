// Uključujemo modul http i definišemo promenljivu
// http u kojoj čuvamo instancu modula
var http = require("http");

// kreiramo server koji će osluškivati port 8081
// prilikom kreiranja servera odmah vezujemo povratnu rutinu
http
  .createServer(function (zahtev, odgovor) {
    // pamtimo putanju koju korisnik želi da poseti
    var url = zahtev.url;

    console.log(url);

    // potrebno je da proverimo koju stranicu korisnik želi da podseti
    if (url === "/index") {
      // kao tip sadržaja postavljamo tekstualni html
      odgovor.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
      odgovor.write("<html>");
      odgovor.write("<head><title>HTTP modul primeri</title></head>");
      odgovor.write("<body>");
      odgovor.write("<h1>Zdravo!</h1>");
      odgovor.write("</body>");
      odgovor.write("</html>");
    } else if (url == "/login") {
      // do sada smo za postavljanje http zaglavlja koristili metod setHeader() koji omogućava
      // postavljanje samo jednog zaglavlja. u ovom primeru ilustrovaćemo upotrebu metoda
      // writeHead() kojim semože postaviti veći broj svojstava zaglavlja

      // status kojim se klijentu saopštava da tražena stranica ne postoji ima broj 200
      odgovor.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
      odgovor.write("<html>");
      odgovor.write("<head><title>HTTP modul primeri</title></head>");
      odgovor.write("<body>");
      odgovor.write("<form>");
      odgovor.write(
        'Korisničko ime:<input type="text" name="username" /><br/>'
      );
      odgovor.write('Lozinka:<input type="password" name="password" /><br/>');
      odgovor.write('Lozinka:<input type="submit" value="Uloguj se" /><br/>');
      odgovor.write("</form>");
      odgovor.write("</body>");
      odgovor.write("</html>");
    } else {
      // status kojim se klijentu saopštava da tražena stranica ne postoji ima broj 404
      odgovor.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      odgovor.write("<html>");
      odgovor.write("<head><title>HTTP modul primeri</title></head>");
      odgovor.write("<body>");
      odgovor.write("<h1>Greška 404: Tražena stranica ne postoji!</h1>");
      odgovor.write("</body>");
      odgovor.write("</html>");
    }

    // na kraju je neohodno da pozovemo metod end nad objektom odgovor
    odgovor.end();

    // nakon poziva metoda end() ne smemo više da referišemo na objekat odgovor
  })
  .listen(8081);

// Definišemo poruku koja će biti ispisana
// nakon pokretanja servera
console.log("Serveru se pristupa uz pomoć adrese http://127.0.0.1:8081/");
