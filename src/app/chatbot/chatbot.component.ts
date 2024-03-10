import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { SocketioService } from '../services/socketio.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages!: any[];
  userInput: string = '';
  userToken!:any;

  constructor(private socket: SocketioService, private pdt: ProductsService) {
    this.userToken = localStorage.getItem('userToken');
    this.socket.setupSocketConnection();
    this.pdt.getAllChatByUser().subscribe(resData => {
      if(resData?.status == 'success') {
        this.messages = resData?.data?.reverse();
      }
    });
    //this.socket.connect();
   /*  this.socket.getMessage('response', (response: any) => {
      this.messages.push(response);
    }); */
  }

  sendMessage() {
    this.messages.push(this.userInput);
    //this.socket.sendMessage('message', this.userInput);
    this.pdt.createChatByUser({question: this.userInput}).subscribe(resData => {
      if(resData?.status == 'success') {
        this.messages = resData?.data?.reverse();
      }
    });

    this.userInput = '';
  }
    
  ngOnDestroy() {
    this.socket.disconnect();
  }
}
