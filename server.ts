import express = require('express');

const app: express.Application = express();

const server = app.listen(1338, () => console.log("Server now running"));

app.use('/', express.static('public'))
app.use('/test', express.static('game_int_testing'))




// Socket.io configuration
var socketio = require('socket.io')(server);

socketio.on('connection', function(socket) {
    console.log('New Connection: ' + socket.id)
})

function send_data(data) {
    socketio.emit('new_data', data);
}


// Testing cycle for development
// const fs = require('fs');
// var file_counter = 0
// function read_send_data() {
//     let rawdata = JSON.parse(fs.readFileSync(`game_int_testing/test_json/${file_counter}.json`));

//     console.log(rawdata);
//     send_data(rawdata);

//     if (file_counter == 7) {file_counter = 0} else {file_counter += 1}
// }
// setInterval(read_send_data, 1000);




// CS JSON listener
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