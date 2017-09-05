var express = require('express');
var http = require('http');
var app = express();
var serve = http.createServer(app);
var io = require('socket.io')(serve);

var mongo = require('mongodb');

var host = "127.0.0.1";
var port = 27017;
var db = new mongo.Db("ChatDB", new mongo.Server(host, port));

// db.open(()=>{});

// var routes = require('./routes');
// var user = require('./routes/user');

app.set('port', process.env.PORT || 3000);
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('public'));

// app.get('/users', user.list);

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

serve.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});



io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat', function (msg) {
        console.log('Server got a message');
        socket.broadcast.emit('chat', msg);
    });
});