
// const express = require('express');
// const app = express();
// const io = require('socket.io')(http);
// server = app.listen(1338, () => console.log("Listening on 1337"));
// app.use(express.static('game_int_testing'));

// io.on('connection', (socket) => {
//     console.log('a user connected');
// });


var express = require('express');
var app = express();
var server = app.listen(1338);

app.use(express.static('public'));

var socketio = require('socket.io');

var socket = socketio(server);

socket.on('connection', function(socket) {
    console.log('New Connection: ' + socket.id)
})

function send_data(data) {
    socket.emit('new_data', data);
}



const http2 = require('http'),
cs_listener = http2.createServer((req, res) => {
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
        send_data(data);
          // console.log(data.teams);
      }
      res.end('');
  });
});
cs_listener.listen("1337");