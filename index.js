const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer(function (req, res) {
  if(req.url === "/") {
    return fs.readFile("index.html", function (err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } else {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;
    fs.readFile(filename, function (err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  }
});

server.listen(0);
server.on('listening', function() {
  const port = server.address().port;
  console.log("Server is running on: http://localhost:" + port + "\nWaiting for connect...");
});