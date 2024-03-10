import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket!:any;

  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token: localStorage.getItem('userToken')
      }
    });
  }

  public sendMessage(channel: string, message: any) {
    this.socket.emit(channel, message);
  }

  public getMessage = (channel: string, callback:any) => {
    this.socket.on(channel, (message:any) =>{
      callback(message);
    });        
  };

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
}
