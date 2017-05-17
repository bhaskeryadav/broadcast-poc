import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { InputTextModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  title = 'app works!';
  socket: any;
  textMsg:string;
  lastMsg:string;

  constructor() {
    this.socket = io.connect();
  }

  broadcast() {
    this.socket.emit("sendBroadcastMessage",this.textMsg);
    this.lastMsg = this.textMsg;
    this.textMsg = "";
  }


}
