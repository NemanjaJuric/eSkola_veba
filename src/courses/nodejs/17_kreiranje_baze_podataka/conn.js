// uključujemo mysql modul
var mysql = require('mysql');

// kreiramo objekat kojim opisujemo konekciju
var con = mysql.createConnection({
  host: "localhost",    
  user: "root",
  password: ""
});

// asinhrono se povezujemo sa SUBP
con.connect(function(err) {
  // proveravamo da li se desila greška
  if (err) 
    // štampamo poruku o grešci i prekidamo izvrđavanje
    return console.log(err);
   
  // u slučaju uspešnog konektovanja štampamo poruku o uspehu
  console.log("Uspešno povezivanje!");
  
  // kreiramo sql upit
  var sql = "CREATE DATABASE knjige";
  
  // asinhrono šaljemo upit SUBP
  con.query(sql, function(err, result) {
      // proveravamo da li se desila greška
      if (err)
         // štampamo poruku o grešci i prekidamo izvrđavanje
         return console.log(err);
      
      // štampamo poruku o uspehu
      console.log("Baza podataka je kreirana!");
  });
});