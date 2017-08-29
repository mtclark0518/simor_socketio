function launch(req, res) {
    res.sendFile('index.html');
}

function joinRoom(req, res) {
    res.sendFile('room1.html');
}




module.exports = {
    launch: launch,
    joinRoom: joinRoom
};