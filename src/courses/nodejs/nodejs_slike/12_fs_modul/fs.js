/*****************************************
 *********** Otvaranje fajla *************
 *****************************************/
 
 // ukljucujemo modul fs
var fs = require("fs");

// aisnhrono otvaramo fajl
console.log("Zapocinjemo otvaranje fajla!");
// otvaramo fajl i definišemo povratni poziv
fs.open('ulaz.txt', 'r', function(err, fd) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Fajl uspešno otvoreno!");     
});

// štampamo poruku o kraju
console.log("Kraj programa!");

/*****************************************
 ********* Informacije o fajlu ***********
 *****************************************/
// asinhrono otvaramo fajl
console.log("Citamo informacije o fajlu!");
// otvaramo fajl i definišemo povratni poziv
fs.stat('ulaz.txt', function(err, stats) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Informacije procitane!");  
   
   // prikazujemo dobijene informacije
   console.log(stats);
   
   // proveravamo tip fajla
   console.log("Da li je obican fajl ? " + stats.isFile());
   console.log("D li je direktorijum ? " + stats.isDirectory()); 
});

// štampamo poruku o kraju
console.log("Kraj programa!");

/*****************************************
 ********** Citanje iz fajla ************
 *****************************************/
 // kreiramo neinicijaliyovani bafer dužine 1024 bajta
var buf = new Buffer(1024);

// asinhrono otvaramo fajl
console.log("Citamo informacije o fajlu!");
// otvaramo fajl i definišemo povratni poziv
fs.open('ulaz.txt', 'r', function(err, fd) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Fajl uspešno otvoren!");  
   console.log("Pokrecemo citanje fajla");
   
   // asinhrono pozivamo metod read
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
   
      //  ako se desila greška
      if (err){
         // štampamo poruku o grešci
         console.log(err);
      }
 
      //  prikazujemo koliko bajtova je procitano
      console.log(bytes + " bajtova je procitano");
      
      // ako je nešto zaista procitano
      if(bytes > 0){
         // prikazujemo samo onaj deo bafera koji sadrži 
         // procitane podatke
         console.log(buf.slice(0, bytes).toString());
      }
   }); 
});

// štampamo poruku o kraju
console.log("Kraj programa!");

/*****************************************
 *********** Pisanje u fajl **************
 *****************************************/
// asinhrono upisujemo sadržaj u fajl
console.log("Počinje upisivanje!");
// upisujemo sadržaj u fajl ulaz.txt
fs.writeFile('ulaz.txt', 'NodeJS je lak i jednostavan!', function(err) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Sadržaj upisan u fajl!");  
   console.log("Čitamo šta je u fajlu!");
   
   // asinhrono pozivamo metod readFile
   fs.readFile('ulaz.txt', function(err, data){
   
      //  ako se desila greška
      if (err){
         // štampamo poruku o grešci
         console.log(err);
      }
 
      //  prikazujemo pročitani sadržaj
      console.log("Pročitano je: " * data.ToString());
   }); 
});

// štampamo poruku o kraju
console.log("Kraj programa!");

/*****************************************
 *********** Zatvaranje fajla ************
 *****************************************/
 // kreiramo neinicijalizovani bafer dužine 1024 bajta
var buf = new Buffer(1024);

// asinhrono otvaramo fajl
console.log("Čitamo informacije o fajlu!");
// otvaramo fajl i definišemo povratni poziv
fs.open('ulaz.txt', 'r', function(err, fd) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Fajl uspešno otvoren!");  
   console.log("Pokrećemo čitanje fajla");
   
   // asinhrono pozivamo metod read
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
   
      //  ako se desila greška
      if (err){
         // štampamo poruku o grešci
         console.log(err);
      }
 
      //  prikazujemo koliko bajtova je pročitano
      console.log(bytes + " bajtova je pročitano");
      
      // ako je nešto zaista pročitano
      if(bytes > 0){
         // prikazujemo samo onaj deo bafera koji sadrži 
         // pročitane podatke
         console.log(buf.slice(0, bytes).toString());
      }
     
      // nakon završenog čitanja, treba da zatvorimo fajl.
      // kao i do sada, to ćemo učiniti asinhrono
      fs.close(fd, function(err) {
         //  ako se desila greška
         if (err){
             // štampamo poruku o grešci
             console.log(err);
         }
 
         //  prikazujemo poruku
         console.log("Fajl uspešno zatvoren!");
      });
   }); 
});

// štampamo poruku o kraju
console.log("Kraj programa!");



/*****************************************
 ***** Brisanje sadržaja fajla ***********
 *****************************************/

// kreiramo neinicijalizovani bafer dužine 1024 bajta
var buf = new Buffer(1024);

// asinhrono otvaramo fajl
console.log("Čitamo informacije o fajlu!");
// otvaramo fajl i definišemo povratni poziv
fs.open('ulaz.txt', 'r', function(err, fd) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Fajl uspešno otvoren!");   
   console.log("Menjamo veličinu fajla!");
   
   // asinhrono menjamo velicinu fajla na 10 bajtova
   fs.ftruncate(fd, 10, function(err){
   
      //  ako se desila greška
      if (err){
         // štampamo poruku o grešci
         console.log(err);
      }
 
      //  prikazujemo koliko bajtova je pročitano
      console.log("Sadržaj fajla nakon brisanja:");
      
     
      // asinhrono pozivamo metod read
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
   
         //  ako se desila greška
         if (err){
            // štampamo poruku o grešci
            console.log(err);
         }
 
         //  prikazujemo koliko bajtova je pročitano
         console.log(bytes + " bajtova je pročitano");
      
         // ako je nešto zaista pročitano
         if(bytes > 0){
            // prikazujemo samo onaj deo bafera koji sadrži 
            // pročitane podatke
            console.log(buf.slice(0, bytes).toString());
         }
     
         // nakon završenog čitanja, treba da zatvorimo fajl.
         // kao i do sada, to ćemo učiniti asinhrono
         fs.close(fd, function(err) {
            //  ako se desila greška
            if (err){
                // štampamo poruku o grešci
                console.log(err);
            }
 
            //  prikazujemo poruku
            console.log("Fajl uspešno zatvoren!");
         });
      }); 
   });
});

// štampamo poruku o kraju
console.log("Kraj programa!");


/*****************************************
 ******** Menjanje imena fajla ***********
 *****************************************/
 
 // kreiramo neinicijalizovani bafer dužine 1024 bajta
var buf = new Buffer(1024);

// asinhrono otvaramo fajl
console.log("Menjamo ime fajlu!");
// fajl ulaz.txt preimenovaćemo u noviUlaz.txt
fs.rename('ulaz.txt', 'noviUlaz.txt', function(err) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, pokušaćemo da pročitamo sadržaj novog fajla
   console.log("Čitamo novi fajl!");   
   fs.open('ulaz.txt', 'r', function(err, fd) {
   
      // proveramo da li se desila greška
      if (err) {
         // štampamo poruku o grešci i prekidamo metod
         return console.error(err);
      }
     
      // asinhrono pozivamo metod read, ako je otvaranje fajla uspelo
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
   
         //  ako se desila greška
         if (err){
            // štampamo poruku o grešci
            console.log(err);
         }
 
         //  prikazujemo koliko bajtova je pročitano
         console.log(bytes + " bajtova je pročitano");
      
         // ako je nešto zaista pročitano
         if(bytes > 0){
            // prikazujemo samo onaj deo bafera koji sadrži 
            // pročitane podatke
            console.log(buf.slice(0, bytes).toString());
         }
     
         // nakon završenog čitanja, treba da zatvorimo fajl.
         // kao i do sada, to ćemo učiniti asinhrono
         fs.close(fd, function(err) {
            //  ako se desila greška
            if (err){
                // štampamo poruku o grešci
                console.log(err);
            }
  
            //  prikazujemo poruku
            console.log("Fajl uspešno zatvoren!");
         });
      });
   });
});

// štampamo poruku o kraju
console.log("Kraj programa!");


/*****************************************
 *********** Brisanje fajla **************
 *****************************************/
// aisnhrono otvaramo fajl
console.log("Brišemo fajl!");
// fajl ulaz.txt preimenovaćemo u noviUlaz.txt
fs.unlink('ulaz1.txt', function(err) {
   
   // proveramo da li se desila greška
   if (err) {
      // štampamo poruku o grešci i prekidamo metod
      return console.error(err);
   }
   
   // Ako je sve u redu, štampamo poruku o uspehu
   console.log("Fajl je uspešno obrisan!");   
});

// štampamo poruku o kraju
console.log("Kraj programa!")