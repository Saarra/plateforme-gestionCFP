import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage: string;
  messageList:  string[] = [];

  constructor(private chatService: ChatService) {
  }
  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  ngOnInit() {
    console.log('hello');
    this.chatService
    .getMessages()
    .subscribe((message: string) => {
      this.messageList.push(message);
      console.log('msg list', this.messageList)
    });

    console.log('fin');
  }

}
