import * as express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import * as path from "path";

class Server {

    public app: any;
    private server: any;
    private io: any;
    private port: number;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, "dist")));

        this.app.get('*', function (req, res) {
            res.sendFile(__dirname+'/dist/index.html');
        });


    }

    private createServer(): void {
        this.server = http.createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || 5000;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running SarVar on port %s', this.port);
        });

        this.io.on("connection", (socket) => {
            socket.emit("sayHi", { data: "welcome" });

            socket.on("sendBroadcastMessage", (data) => {
                socket.broadcast.emit("broadcastMsg", data);
                console.log(data);
            });

        });



    }
}

let server = Server.bootstrap();
export = server;
