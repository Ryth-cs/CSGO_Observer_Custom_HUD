
const http = require('http'),
fs = require('fs'),
express = require("express");

server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (req.method != "POST") {
      return res.end('');
  }
  let body,
      data,
      bodyChunks = [];
  req.on('data', (data) => {
      bodyChunks.push(data);
  });
  req.on('end', () => {
      body = Buffer.concat(bodyChunks);
      data = JSON.parse(body);
      if (data.auth && data.auth.token == "120987") {
          console.log(data)
          // console.log(data.teams);
      }
      res.end('');
  });

});
server.listen("1337");
