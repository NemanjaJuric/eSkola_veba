/*****************************************
 *********** kreiranje bafera ************
 *****************************************/
 
var buffer = new Buffer(10);
var buffer1 = new Buffer([10, 20, 30, 40, 50]);
var buffer2 = new Buffer("Elektronski kurs NodeJS", "utf-8");

console.log(buffer);
console.log(buffer1);
console.log(buffer2);

/*****************************************
 ************ pisanje u bafer ************
 *****************************************/

// kreiramo bafer veličine 256 bajtova
buf = new Buffer(256);
// upisujemo neki sadržaj u bafer
len = buf.write("NodeJS je lak");

// u konzoli prikazujemo koliko smo bajtova upisali u bafer
console.log("Upisano bajtova : "+  len);
// kao i dužinu bafera
console.log("Upisano bajtova : "+  len);

/*****************************************
 *********** citanje iz bafera ***********
 *****************************************/
 
 // kreiramo bafer veličine 26 bajtova
buf = new Buffer(26);
// inicijalizujemo bafer malim slovima engleske abecede
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

// štampamo sadržaj bafera kao ASCII
console.log( buf.toString('ascii'));  
// štampamo prvih 5 bajtova bafera kao ASCII   
console.log( buf.toString('ascii',0,5));  
// štampamo prvih 5 bajtova bafera kao UTF-8  
console.log( buf.toString('utf8',0,5));

/*****************************************
 ********** nadovezivanje bafera *********
 *****************************************/

// kreiramo prvi bafer
var buffer1 = new Buffer('NodeJS  ');
// kreiramo drugi bafer
var buffer2 = new Buffer('elektronski kurs.');
// nadovezivanjem dva bafera dobijamo treći
var buffer3 = Buffer.concat([buffer1,buffer2]);

// prikazujemo rezultat nadovezivanja
console.log("Rezultat nadovezivanja: " + buffer3.toString());

/*****************************************
 ********* uporedjivanje bafera **********
 *****************************************/
 
 // kreiramo dva bafera
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');

// upoređujemo ih
var result = buffer1.compare(buffer2);

// i proveramo povratnu vrednost metoda
if(result < 0) {
   console.log(buffer1 +" je ispred " + buffer2);
} else if(result === 0) {
   console.log(buffer1 +" je identičan " + buffer2);
} else {
   console.log(buffer1 +" je iza " + buffer2);
}

/*****************************************
 *********** kopiranje bafera ************
 *****************************************/

// kreiramo bafer koji sadrži string ABC
var buffer1 = new Buffer('ABC');

// kreiramo neinicijalizovani bafer dužine 3 bajta
var buffer2 = new Buffer(3);

// kopiramo sadržaj prvog bafera u drugi bafer
buffer1.copy(buffer2);

// prikazujemo rezultat kopiranja
console.log("Sadržaj drugog bafera: " + buffer2.toString());

/*****************************************
 ********** izdvajanje iz bafera *********
 *****************************************/
// kreiramo bafer koji sadrži string
var buffer1 = new Buffer('Elektronski kurs NodeJS');

// izvlačimo podbafer iz polaznog bafera
var buffer2 = buffer1.slice(0,12);

// štampamo rezultat izvršavanja
console.log("Dobijeni podbafer: " + buffer2.toString());
