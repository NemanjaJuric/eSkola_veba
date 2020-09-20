var http = require("http");
var url = require("url");
var sql = require("./sql");
var fs = require("fs");

function kreirajHTTPZaglavlje(cookie, da){
   
   var httpZaglavlje = "";

   if (da) {
      httpZaglavlje = {
         "Content-Type" : "text/html; charset=utf-8",
         "Set-Cookie": cookie.name + "=" + cookie.value + ";max-age="+cookie.max_age
      };
   }
   else {
      httpZaglavlje = {
         "Content-Type" : "text/html; charset=utf-8",
      };
   }
   
   return httpZaglavlje;
}

function kreirajPocetakStr(active){
   
   var str = '<html><head><title>NodeJS elektronski kurs</title><link rel="stylesheet" href="stil.css"></head><body><div class="content">';
   
   str += '<div class="header"><h1/>Elektronski kurs NodeJS - Virtuelna biblioteka</h1>';
   str += '<ul class="menu">';
   
   if (active == 1)
      str += '<li><a href="/index" class="active">Sve knjige</a></li>';
   else
      str += '<li><a href="/index">Sve knjige</a></li>';
   
   if (active == 2)
      str += '<li><a href="/nova_knjiga"  class="active">Dodaj knjigu</a></li>';
   else 
      str += '<li><a href="/nova_knjiga">Dodaj knjigu</a></li>';
   
   if (active == 3)
      str += '<li><a href="/izmeni" class="active">Izmeni knjigu</a></li>';
   else 
      str += '<li><a href="/izmeni">Izmeni knjigu</a></li>';
   
   if (active == 7)
      str += '<li><a href="/obrisi" class="active">Obriši knjigu</a></li>';
   else 
      str += '<li><a href="/obrisi">Obriši knjigu</a></li>';
   
   if (active == 4)
      str += '<li><a href="/registracija" class="active">Registracija</a></li>';
   else 
      str += '<li><a href="/registracija">Registracija</a></li>';
   
   if (active == 5)
      str += '<li><a href="/login" class="active">Login</a></li>';
   else 
      str += '<li><a href="/login">Login</a></li>';
   
   if (active == 6)
      str += '<li><a href="/logout" class="active">Logout</a></li>';
   else 
      str += '<li><a href="/logout">Logout</a></li>';
   
   str += '</ul>';
   str += '</div>';
   
   return str;
}

function kreirajKrajStr(){
   
   return "</div></body></html>";
}

function rutiranje(req, res) {
   
   var putanja = req.url;
   var metod = req.method;
   var elementi = url.parse(putanja, true);
   var stranica = elementi.pathname;
   var cookies = req.headers.cookie;
   
   var session = false;

   if (cookies != undefined) {
      session = true;
   }
   if (stranica === '/obrisi') {
      if (metod === "GET") {
         var id = elementi.query.id;
         if (session) {
            if (typeof id != 'undefined' && id != '') {
               
               sql.izvrsi(sql.obrisiKnjigu(id), function(redovi) {
                  
                  if (redovi == null || redovi.affectedRows < 1) {
                     res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                     res.write(kreirajPocetakStr(7));
                     res.write('<div class="form">');
                     res.write('<form action="/obrisi">');
                     res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
                     res.write('<input type="submit" value="Obriši knjigu"/><br/>');
                     res.write("</form>");
                     res.write("</div>");
                     res.write('<div class="form">');
                     res.write("<p>Ne postoji knjiga sa tim ID-em.</p>");
                     res.write("</div>");
                     res.write(kreirajKrajStr());
                     res.end();
                     return;
                  }
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(7));
                  res.write('<div class="form">');
                  res.write('<form action="/obrisi">');
                  res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
                  res.write('<input type="submit" value="Obriši knjigu"/><br/>');
                  res.write("</form>");
                  res.write("</div>");
                  res.write('<div class="form">');
                  res.write("<p>Obrisano "+redovi.affectedRows+" knjiga.</p>");
                  res.write("</div>");
                  res.write(kreirajKrajStr());
                  res.end();
                  return;
               });
            }
            else {
               
               res.writeHead(200, kreirajHTTPZaglavlje(null, false));
               res.write(kreirajPocetakStr(7));
               res.write('<div class="form">');
               res.write('<form action="/obrisi">');
               res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
               res.write('<input type="submit" value="Obriši knjigu"/><br/>');
               res.write("</form>");
               res.write("</div>");
               res.write(kreirajKrajStr());
               res.end();
            }
         }
         else {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(7));
            res.write('<p>Morate se prvo ulogovati</p>');
            res.write(kreirajKrajStr());
            res.end();
         }
      }
   }
   else if (stranica === '/izmeni') {
      if (metod === "GET") {
         var id = elementi.query.id;

         if (session) {
            if (typeof id != 'undefined' && id != '') {
               
               sql.izvrsi(sql.nadjiKnjigu(id), function(redovi) {
                  
                  if (redovi == null || redovi.length < 1) {
                     res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                     res.write(kreirajPocetakStr(3));
                     res.write('<div class="form">');
                     res.write('<form action="/izmeni">');
                     res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
                     res.write('<input type="submit" value="Pronađi knjigu"/><br/>');
                     res.write("</form>");
                     res.write("</div>");
                     res.write('<div class="form">');
                     res.write("<p>Ne postoji knjiga sa tim ID-em.</p>");
                     res.write("</div>");
                     res.write(kreirajKrajStr());
                     res.end();
                     return;
                  }
                  
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(3));
                  res.write('<div class="form">');
                  res.write('<form action="/izmeni">');
                  res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
                  res.write('<input type="submit" value="Pronadji knjigu"/><br/>');
                  res.write("</form>");
                  res.write("</div>");
                  res.write('<div class="form">');
                  res.write('<form action="/izmeni" method="POST">');
                  res.write('Naslov: <input type="text" id="naslov" name="naslov" value="'+redovi[0].naslov+'"/><br/>');
                  res.write('Autor: <input type="text" id="autor" name="autor" value="'+redovi[0].autor+'"/><br/>');
                  res.write('Izdavač: <input type="text" id="izdavac" name="izdavac" value="'+redovi[0].izdavac+'"/><br/>');
                  res.write('Žanr: <input type="text" id="zanr" name="zanr" value="'+redovi[0].zanr+'"/><br/>');
                  res.write('Godina izdanja: <input type="text" id="gi" name="gi" value="'+redovi[0].god_izdanja+'"/><br/>');
                  res.write('Broj strana: <input type="text" id="bs" name="bs" value="'+redovi[0].br_str+'"/><br/>');
                  res.write('Tiraž: <input type="text" id="tiraz" name="tiraz" value="'+redovi[0].tiraz+'"/><br/>');
                  res.write('<input type="submit" id="'+id+'" name="'+ id +'" value="Izmeni knjigu"/><br/>');
                  res.write("</form>");
                  res.write("</div>");
                  res.write(kreirajKrajStr());
                  res.end();
               });
            }
            else {
               
               res.writeHead(200, kreirajHTTPZaglavlje(null, false));
               res.write(kreirajPocetakStr(3));
               res.write('<div class="form">');
               res.write('<form action="/izmeni">');
               res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
               res.write('<input type="submit" value="Pronađi knjigu"/><br/>');
               res.write("</form>");
               res.write("</div>");
               res.write(kreirajKrajStr());
               res.end();
            }
         }
         else {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(3));
            res.write('<p>Morate se prvo ulogovati</p>');
            res.write(kreirajKrajStr());
            res.end();
         }
      }
      else if (metod === "POST") {
         
         var buf = [];
         
         req.on('data', function(chunk) {
            buf.push(chunk);
         });
         
         req.on('end', function(err) {
            var podaci = Buffer.concat(buf).toString();
            var poljaForme = podaci.split('&');
            var naslov = poljaForme[0].split("=")[1].replace(/\+/gi,' ');
            var autor =  poljaForme[1].split("=")[1].replace(/\+/gi,' ');
            var izdavac = poljaForme[2].split("=")[1].replace(/\+/gi,' ');
            var zanr =  poljaForme[3].split("=")[1].replace(/\+/gi,' ');
            var god = poljaForme[4].split("=")[1];
            var br_str =  poljaForme[5].split("=")[1];
            var tiraz = poljaForme[6].split("=")[1];
            var id = poljaForme[7].split("=")[0];
            
            var upit = sql.izmeniKnjigu(naslov, autor, izdavac, zanr, god, br_str, tiraz, id);
            
            sql.izvrsi(upit, function(redovi) {
               if (redovi == null) {
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(3));
                  res.write('<p>Greška u komunikaciji</p>');
                  res.write(kreirajKrajStr());
                  res.end();
                  return;
               }
               res.writeHead(200, kreirajHTTPZaglavlje(null, false));
               res.write(kreirajPocetakStr(3));
               res.write('<div class="form">');
               res.write('<form action="/izmeni">');
               res.write('ID knjige: <input type="text" id="id" name="id" /><br/>');
               res.write('<input type="submit" value="Pronađi knjigu"/><br/>');
               res.write("</form>");
               res.write("</div>");
               res.write('<div class="form">');
               res.write("<p>Azurirano "+redovi.affectedRows+" redova</p>");
               res.write("</div>");
               res.write(kreirajKrajStr());
               res.end();
            });
         });
      }
   }
   else if (stranica === '/stil.css'){
      fs.readFile('stil.css',function(err,data){
         res.writeHead(200,{"Content-Type": "text/css"});
         res.write(data);
         res.end();
      });
   }
   else if (stranica == '/index') {
      
      if (metod == "GET") {
         
         sql.izvrsi(sql.sveKnjige(), function(redovi){
            
            if (redovi == null) {
               res.writeHead(200, kreirajHTTPZaglavlje(null, false));
               res.write(kreirajPocetakStr(1));
               res.write('<p>Greška u komunikaciji</p>');
               res.write(kreirajKrajStr());
               res.end();
               return;
            }
            
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(1));
            res.write('<table class="knjige">');
            res.write("<tr>");
            res.write("<th>ID</th><th>Naslov</th><th>Autor</th><th>Broj strana</th><th>Žanr</th><th>Izdavač</th><th>Godina izdanja</th><th>Tiraž</th>");
            res.write("</tr>");
            for (i = 0; i < redovi.length; i++) {
               res.write("<tr>");
               res.write("<td>" + redovi[i].id + "</td>");
               res.write("<td>" + redovi[i].naslov + "</td>");
               res.write("<td>" + redovi[i].autor + "</td>");
               res.write("<td>" + redovi[i].br_str + "</td>");
               res.write("<td>" + redovi[i].zanr + "</td>");
               res.write("<td>" + redovi[i].izdavac + "</td>");
               res.write("<td>" + redovi[i].god_izdanja + "</td>");
               res.write("<td>" + redovi[i].tiraz + "</td>");
               res.write("</tr>");
            }
            res.write("</table>");
            res.write(kreirajKrajStr());
            res.end();
         });
      }
   }
   else if (stranica == "/login") {
      
      if (metod === "GET") {
         if (session) {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(5));
            res.write('<p>Ulogovani ste</p>');
            res.write(kreirajKrajStr());
            res.end();
         }
         else {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(5));
            res.write('<div class="form">');
            res.write('<form action="/login" method="POST">');
            res.write('Korisničko ime: <input type="text" id="user" name="user" /><br/>');
            res.write('Šifra: <input type="password" id="pass" name="pass" /><br/>');
            res.write('<input type="submit" value="Uloguj se"/><br/>');
            res.write("</form>");
            res.write("</div>");
            res.write(kreirajKrajStr());
            res.end();
         }
      }
      else if (metod === "POST") {
         
         var buf = [];
         
         req.on('data', function(chunk) {
            
            buf.push(chunk)
         });
         
         req.on('end', function(err) {
            
            var podaci = Buffer.concat(buf).toString();
            var poljaForme = podaci.split('&');
            var korIme = poljaForme[0].split("=")[1];
            var sifra =  poljaForme[1].split("=")[1];
            
            sql.izvrsi(sql.nadjiKorisnika(korIme, sifra), function(redovi) {
               
               if (redovi === null) {
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(5));
                  res.write('Neuspešno logovanje');
                  res.write(kreirajKrajStr());
                  res.end();
               }
               else if (redovi.length == 1) {
                  var cookie = {"name" : "session_id", "value" : redovi[0].id.toString(), "max_age" : 3600};
                  
                  res.writeHead(200, kreirajHTTPZaglavlje(cookie, true));
                  res.write(kreirajPocetakStr(5));
                  res.write('Uspešno logovanje');
                  res.write(kreirajKrajStr());
                  res.end();
               }
               else {
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(5));
                  res.write('Neuspešno logovanje');
                  res.write(kreirajKrajStr());
                  res.end();
               }
            });
         });
      }
   }
   else if (stranica === "/registracija") {
      
      if (metod === "GET") {
         if (session) {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(4));
            res.write('<p>Ulogovani ste</p>');
            res.write(kreirajKrajStr());
            res.end();
         }
         else {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(4));
            res.write('<div class="form">');
            res.write('<form action="/registracija" method="POST">');
            res.write('<lagel for="ime">Ime:</label><input type="text" id="ime" name="ime" /><br/>');
            res.write('<lagel for="prezime">Prezime:</label><input type="text" id="prezime" name="prezime" /><br/>');
            res.write('<lagel for="user">Korisničko ime:</label><input type="text" id="user" name="user" /><br/>');
            res.write('<lagel for="pass">Šifra:</label><input type="password" id="pass" name="pass" /><br/>');
            res.write('<lagel for="mejl">Mejl:</label><input type="text" id="mejl" name="mejl" /><br/>');
            res.write('<lagel for="god">Godište:</label><input type="text" id="god" name="god" /><br/>');
            res.write('<input type="submit" value="Registruj se"/><br/>');
            res.write("</form>");
            res.write("</div>");
            res.write(kreirajKrajStr());
            res.end();
         }
      }
      else if (metod === "POST") {
         var buf = [];
         
         req.on('data', function(chunk) {
            
            buf.push(chunk);
         });
         
         req.on('end', function(err) {
            
            var podaci = Buffer.concat(buf).toString();
            var poljaForme = podaci.split('&');
            var ime = poljaForme[0].split("=")[1];
            var prezime =  poljaForme[1].split("=")[1];
            var kor_ime = poljaForme[2].split("=")[1];
            var sifra =  poljaForme[3].split("=")[1];
            var mejl = poljaForme[4].split("=")[1];
            var godiste =  poljaForme[5].split("=")[1];
            
            var upit = sql.unesiKorisnika(ime, prezime, kor_ime, sifra, mejl, godiste);
            
            sql.izvrsi(upit, function(redovi){
               
               if (redovi != null) {
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(4));
                  res.write('Uspešna registracija');
                  res.write(kreirajKrajStr());
                  res.end();
               }
               else{
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(4));
                  res.write('Registracija neuspešna');
                  res.write(kreirajKrajStr());
                  res.end();
               }
            });
         });
      }
   }
   else if (stranica == "/nova_knjiga") {
      
      if (metod == "GET") {
         if (session) {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(2));
            res.write('<div class="form">');
            res.write('<form action="/nova_knjiga" method="POST">');
            res.write('Naslov: <input type="text" id="naslov" name="naslov" /><br/>');
            res.write('Autor: <input type="text" id="autor" name="autor" /><br/>');
            res.write('Izdavač: <input type="text" id="izdavac" name="izdavac" /><br/>');
            res.write('Žanr: <input type="text" id="zanr" name="zanr" /><br/>');
            res.write('Godina izdanja: <input type="text" id="gi" name="gi" /><br/>');
            res.write('Broj strana: <input type="text" id="bs" name="bs" /><br/>');
            res.write('Tiraž: <input type="text" id="tiraz" name="tiraz" /><br/>');
            res.write('<input type="submit" value="Unesi novu knjigu"/><br/>');
            res.write("</form>");
            res.write("</div>");
            res.write(kreirajKrajStr());
            res.end();
         }
         else {
            res.writeHead(200, kreirajHTTPZaglavlje(null, false));
            res.write(kreirajPocetakStr(2));
            res.write('<p>Morate se prvo ulogovati</p>');
            res.write(kreirajKrajStr());
            res.end();
         }
      }
      else if (metod == "POST"){
         
         var buf = [];
         
         req.on('data', function(chunk) {
            buf.push(chunk);
         });
         
         req.on('end', function(err) {
            
            var podaci = Buffer.concat(buf).toString();
            var poljaForme = podaci.split('&');
            var naslov = poljaForme[0].split("=")[1].replace(/\+/gi,' ');
            var autor =  poljaForme[1].split("=")[1].replace(/\+/gi,' ');
            var izdavac = poljaForme[2].split("=")[1].replace(/\+/gi,' ');
            var zanr =  poljaForme[3].split("=")[1].replace(/\+/gi,' ');
            var god = poljaForme[4].split("=")[1];
            var br_str =  poljaForme[5].split("=")[1];
            var tiraz = poljaForme[6].split("=")[1];
            
            var upit = sql.unesiKnjigu(naslov, autor,izdavac, zanr, god, br_str, tiraz);
            
            sql.izvrsi(upit, function(redovi){
               
               if (redovi != null) {
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(2));
                  res.write('Knjiga upamćena');
                  res.write(kreirajKrajStr());
                  res.end();
               }
               else{
                  res.writeHead(200, kreirajHTTPZaglavlje(null, false));
                  res.write(kreirajPocetakStr(2));
                  res.write('Greška');
                  res.write(kreirajKrajStr());
                  res.end();
               }
            });
         })
      }
   }
   else if (stranica == "/logout") {
      
      if (cookies != undefined) {
         var delici = cookies.split("=");
         
         var cookie = {"name" : "session_id", "value" : delici[1], "max_age" : 0};
         
         res.writeHead(200, kreirajHTTPZaglavlje(cookie, true));
         res.write(kreirajPocetakStr(6));
         res.write('<p>Odjavljeni ste</p>');
         res.write(kreirajKrajStr());
         res.end();
      }
      else {
         res.writeHead(200, kreirajHTTPZaglavlje(null, false));
         res.write(kreirajPocetakStr(6));
         res.write('<p>Morate se prvo ulogovati</p>');
         res.write(kreirajKrajStr());
         res.end();
      }
   }
   else {
         res.writeHead(404, kreirajHTTPZaglavlje(null, false));
         res.write(kreirajPocetakStr(1));
         res.write('<p>Tražena stranica ne postoji</p>');
         res.write(kreirajKrajStr());
         res.end();
   }
}

module.exports.rutiranje = rutiranje;