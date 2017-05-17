"use strict";
var express = require("express");
var http = require("http");
var socketIo = require("socket.io");
var path = require("path");
var Server = (function () {
    function Server() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.createApp = function () {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "dist")));
        this.app.get('*', function (req, res) {
            res.sendFile(__dirname + '/dist/index.html');
        });
    };
    Server.prototype.createServer = function () {
        this.server = http.createServer(this.app);
    };
    Server.prototype.config = function () {
        this.port = process.env.PORT || 5000;
    };
    Server.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running SarVar on port %s', _this.port);
        });
        this.io.on("connection", function (socket) {
            socket.emit("sayHi", { data: "welcome" });
            socket.on("sendBroadcastMessage", function (data) {
                socket.broadcast.emit("broadcastMsg", data);
                console.log(data);
            });
        });
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server;
