
/**
 * Module dependencies.
 */
var addons = require('./node_modules/videoproc/videoproc');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
app.configure(function () {
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('get image', function(){
	var nodeBuffer = addons.getImage();
    io.emit('send image', nodeBuffer);
  });
});


http.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
  console.log('C/C++ addons.hello() =', addons.hello());

});
