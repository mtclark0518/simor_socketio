const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.listen(process.env.PORT || 3000);


//SERVER
app.listen(process.env.PORT || 3000, () => {
    console.log('---i\'m alllllive on port: ' + PORT);
});

//ROUTES
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res) {
    res.sendFile(__dirname + 'index.html');
});




//This breaks whenever i try to bring it out into another file
//Chatroom
//who is connected
var numUsers = 0;

//ROOMS


io.sockets.on('connection', function(socket) {

    var addedUser = false;
    // when the client emits 'add user', this listens and executes
    socket.on('add user', function(username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('updatechat', 'SERVER', username + ' has joined the room');


        // when the client emits 'new message', this listens and executes
        socket.on('new message', function(data) {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });
        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function() {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function() {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function() {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    });
});