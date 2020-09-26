// uključujemo modul http
var http = require("http");
// uključujemo formidable modul
var formidable = require("formidable");
// uključujemo modul fs
var fs = require("fs");

// kreiramo veb server koji osluškuje port 8081
http.createServer(function(zahtev, odgovor){
   
   if (zahtev.url === "/fileupload") {

      // instanciramo objekat tipa formidable koji sadrži podatke sa forme
      var form = new formidable.IncomingForm();

      // asinhrono parsiramo sadržaj forme
      form.parse(zahtev, function (err, polja, fajlovi) {

         // proveravamo da li se desila neka greška
         if (err) {

            // prikazujemo poruku o grešci
            console.log(err)
         }
       
         // saznajemo putanju na kojoj je privremeno sačuvan fajl
         var staraPutanja = fajlovi.filetoupload.path;
         // kreiramo novu putanju
         var datum = new Date();
         var novaPutanja = d.toDateString().replace(/ /gi,'_') + '_' + fajlovi.filetoupload.name;

         // nakon kreiranja nove putanje, pokušaćemo da preimenujemo fajl
         fs.rename(staraPutanja, novaPutanja, function(err)){

            // proveravamo da li se desila neka greška
            if (err) {

               // prikazujemo poruku o grešci
               console.log(err);
            }

            // ako je sve u redu prikazećemo korisniku poruku
            odgovor.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
            odgovor.write('Fajl uspešno poslat');
            odgovor.end();
         });
      });
   }
   else {

      // kreiramo formu
      odgovor.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
      odgovor.write("<html><head><title>Formidable modul</title><head><body>");
      odgovor.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
      odgovor.write('Izaberite fajl: <input type="file" name="filetoupload"><br>');
      odgovor.write('<input type="submit" value="Pošalji fajl">');
      odgovor.write('</form>');
      odgovor.write("</body></html>");
      odgovor.end();
   }

}).listen(8081);
