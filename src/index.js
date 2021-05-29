var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cors = require('cors');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

mongoose.connect('mongodb+srv://Josias:strong23992shu@cluster0-qo5e9.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(3333);

