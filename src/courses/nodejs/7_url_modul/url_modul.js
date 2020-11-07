// Uključujemo modul http i definišemo promenljivu
// http u kojoj čuvamo instancu modula
var http = require("http");
// uključujemo i url modul
var url = require("url");

// kreiramo server koji će osluškivati port 8081
// prilikom kreiranja servera odmah vezujemo povratnu rutinu
http
  .createServer(function (zahtev, odgovor) {
    var metodPristupa = zahtev.method;

    // pamtimo putanju koju korisnik želi da poseti
    var putanja = zahtev.url;
    // nakon što smo saznali putanju potrebno je da je parsiramo
    var elementi = url.parse(putanja, true);

    // nakon što je url modul izdvoji elemente putanje, možemo lako da im pristupimo
    // elementima putanje

    // pathname je stranica koju korisnik želi da poseti
    var stranica = elementi.pathname;

    // vrednosti polja iz forme možemo lako da pročitamo iz query objekta parsiranog izraza
    var korisnicko_ime = elementi.query.username;
    var sifra = elementi.query.password;

    //console.log(elementi);
    console.log(metodPristupa);

    // potrebno je da proverimo koju stranicu korisnik želi da podseti
    if (stranica === "/index") {
      // kao tip sadržaja postavljamo tekstualni html
      odgovor.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

      // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
      odgovor.write("<html>");
      odgovor.write("<head><title>HTTP modul primeri</title></head>");
      odgovor.write("<body>");
      odgovor.write("<h1>Zdravo!</h1>");
      odgovor.write("</body>");
      odgovor.write("</html>");
    } else if (stranica == "/login") {
      // kada smo saznali da korisnik želi da poseti login stranicu, potrebno je da proverimo
      // da li nam sa te stranice dolazi nakon klika na dugme ili je prvi put otvara

      // ako je korisnik popunio oba polja, treba da pozdravimo
      if (
        metodPristupa === "POST" &&
        typeof korisnicko_ime != "undefined" &&
        typeof sifra != "undefined" &&
        korisnicko_ime != "" &&
        sifra != ""
      ) {
        // status kojim se klijentu saopštava da tražena stranica ne postoji ima broj 200
        odgovor.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
        odgovor.write("<html>");
        odgovor.write("<head><title>HTTP modul primeri</title></head>");
        odgovor.write("<body>");
        odgovor.write("<h1>Zdravo, " + korisnicko_ime + "!</h1>");
        odgovor.write("</body>");
        odgovor.write("</html>");
      }
      // u suprotnom, prikazaćemo mu opet login formu
      else {
        // do sada smo za postavljanje http zaglavlja koristili metod setHeader() koji omogućava
        // postavljanje samo jednog zaglavlja. u ovom primeru ilustrovaćemo upotrebu metoda
        // writeHead() kojim semože postaviti veći broj svojstava zaglavlja

        // status kojim se klijentu saopštava da tražena stranica ne postoji ima broj 200
        odgovor.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
        odgovor.write("<html>");
        odgovor.write("<head><title>HTTP modul primeri</title></head>");
        odgovor.write("<body>");
        odgovor.write('<form method="POST" action="/login">');
        odgovor.write(
          'Korisničko ime:<input type="text" name="username" /><br/>'
        );
        odgovor.write('Lozinka:<input type="password" name="password" /><br/>');
        odgovor.write('Lozinka:<input type="submit" value="Uloguj se" /><br/>');
        odgovor.write("</form>");
        odgovor.write("</body>");
        odgovor.write("</html>");
      }
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
