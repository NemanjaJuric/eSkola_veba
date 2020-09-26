var http = require("http");
var rut = require("./rutiranje");

http.createServer(function(req, res) {
   
   rut.rutiranje(req, res);
   
}).listen(8081);

console.log("Server started");