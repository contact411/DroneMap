var express = require('express');
var app = express();
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
}
);