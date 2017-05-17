import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import {PanelModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  
socket:any;
  messages:Array<any> = new Array<any>();

  constructor(){
    this.socket = io.connect();
    this.socket.on("broadcastMsg",(data)=>{
      let msg = "Admin : "+data;
      this.messages.push(msg);
    })

  }


}
