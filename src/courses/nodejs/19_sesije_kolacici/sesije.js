var http = require("http");

http
  .createServer(function (req, res) {
    var httpHeader = null;

    var cookies = req.headers.cookie;

    if (cookies != undefined) {
      cookies = cookies.split("=");
      httpHeader = {
        "Content-Type": "text/html; charset=utf-8",
        "Set-Cookie": "session_id=test;max-age=0",
      };
      res.writeHead(200, httpHeader);
      res.write("<h1>Sesije i kolacici</h1>");
      res.write("Kolacic: " + cookies[0] + "<br/>");
      res.write("Vrednost: " + cookies[1] + "<br/>");
      res.write("<br/>Kolacici obrisan");
      res.end();
    } else {
      httpHeader = {
        "Content-Type": "text/html; charset=utf-8",
        "Set-Cookie": "mycookie=test;max-age=3600",
      };
      res.writeHead(200, httpHeader);
      res.write("<h1>Sesije i kolacici</h1>");
      res.write("Kolacic nije postavljen");
      res.end();
    }
  })
  .listen(8081);

console.log("Server started;");
