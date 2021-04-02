var express = require('express');
var app = express();
var server = app.listen(1338);

app.use(express.static('public'));
// app.use(express.static('game_int_testing'));

const fs = require('fs');
// while (true) {
//     setTimeout( function () {
//         let rawdata = JSON.parse(fs.readFileSync('game_int_testing/test_json/0.json'));
//         console.log(rawdata);
//     }, 1000);
// }
var file_counter = 0
function read_send_data() {
    if (file_counter == 8) {
        file_counter = 0
    }
    let rawdata = JSON.parse(fs.readFileSync(`game_int_testing/test_json/${file_counter}.json`));

    console.log(rawdata);
    send_data(rawdata);

    file_counter += 1
}
setInterval(read_send_data, 1000);

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



