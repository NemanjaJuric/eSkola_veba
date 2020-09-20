// uključujemo modul http
var http = require("http");
// uključujemo nodemailer modul
var nodemailer = require("nodemailer");

// kreiramo veb server koji osluškuje port 8081
http.createServer(function(zahtev, odgovor){

   // proveravamo koju stranicu korisnik zeli da poseti
   if (zahtev.url == "/mejl" && zahtev.method == "POST") {
      
      // kreiramo prazan bafer na koji ćemo nadovezati delove forme
      var bafer = [];

      zahtev.on('data', function(paket) {
         // nadovezujemo pristigle delove
         bafer.push(paket);
      });

      zahtev.on('end', function() {

         var poruka = Buffer.concat(bafer).toString();

         // parsiramo polja forme
         var poljaForme = poruka.split('&');
         var ime = poljaForme[0].split('=')[1];
         var mejl = poljaForme[1].split('=')[1];
         var subject = poljaForme[2].split('=')[1];
         var sadrzajPoruke = poljaForme[3].split('=')[1].replace(/\+/gi,' ');

         // kreiramo pošiljaoca. potrebno je da navedemo servis, korisnicko ime i sifru
         var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
             user: 'mejl_adresa@gmail.com',
             pass: 'šifra_naloga'
           }
         });
         
         // kreiramo sadržaj poruke
         var mailOptions = {
           from: 'mejl_adresa@gmail.com',
           to: mejl,
           subject: subject,
           text: sadrzajPoruke
         };

         // asinhrono šaljemo mejl
         transporter.sendMail(mailOptions, function(error, info){
  
           // proveravamo greške
           if (error) {
             // štamapmo poruku o grešci ako se desila
             console.log(error);
           } else {
            
             // u suprotnom prijavljujemo uspeh
             // status kojim se klijentu saopštava da tražena stranica ne postoji ima broj 200
             odgovor.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});

             // nakon što smo postavili zaglavlje, možemo da generišemo i odgovor
             odgovor.write('<html>');
             odgovor.write('<head><title>Slanje mejla</title></head>');
             odgovor.write('<body>');
             odgovor.write('<h1>Poruka uspešno poslata!</h1>');
             odgovor.write('</body>');
             odgovor.write('</html>');

             return odgovor.end();
           }
         });  
      });
   }
   else {
      // kreiramo formu
      odgovor.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
      odgovor.write("<html><head><title>Nodemailer modul</title><head><body>");
      odgovor.write('<form action="mejl" method="post">');
      odgovor.write('Ime i prezime: <input type="text" name="ime" id="ime"><br>');
      odgovor.write('Mejl adresa: <input type="text" name="mejl" id="mejl"><br>');
      odgovor.write('Subject: <input type="text" name="sub" id="sub"><br>');
      odgovor.write('Sadržaj poruke: <textarea id="poruka" name="poruka" rows="4" cols="50">Unesite poruku</textarea><br>');
      odgovor.write('<input type="submit" value="Pošalji mejl">');
      odgovor.write('</form>');
      odgovor.write("</body></html>");
      odgovor.end();
   }

}).listen(8081);

// prikazujemo poruku u konzoli
console.log("Serveru se pristupa na adresi: 127.0.0.1:8081/");