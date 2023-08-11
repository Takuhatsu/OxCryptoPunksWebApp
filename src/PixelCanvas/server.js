const fs = require("fs");
const http = require("http");
const url = require("url");

const host = "0.0.0.0";
const port = 8000;

const canvas = new Array(143);
for (let i=0; i <=143; i++) {
  canvas[i]= new Array(143);
};

const requestListener = function (req, res) {
  console.log(`${req.socket.remoteAddress} "${req.url}"`);

  const current_url = url.parse(req.url, true); // new URL object
  if (req.url == "/index.html" || req.url == "/") {
    fs.readFile("./index.html", function (err, data) {
        console.log(err, data);
      res.end(data);
    });
  } else if (req.url == "/script.js") {
    fs.readFile("./script.js", function (err, data) {
      res.end(data);
    });
  } else if (req.url == "/style.css") {
    fs.readFile("./style.css", function (err, data) {
      res.end(data);
    });
  } else if (current_url.pathname == "/put-pixel") {
    const x = current_url.query.x;
    const y = current_url.query.y;
    const color = current_url.query.color;
    canvas[x][y] = color;
    res.end();
  } else if (current_url.pathname == "/get-canvas") {
    res.end(JSON.stringify(canvas));
  } else {
    res.writeHead(404);
    res.end(`Hey, ${req.socket.remoteAddress}:${req.socket.remotePort}, we don't have that\n`);
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
