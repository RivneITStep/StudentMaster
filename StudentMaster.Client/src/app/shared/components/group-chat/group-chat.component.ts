import { Component, OnInit, Input } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { ChatMessage } from '@core/models/signalr/chatMessage.models';
import { ToolsService } from '@core/services/tools.service';
import { AuthenticationService, API, JWT_TOKEN } from '@core';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnInit {

  private _hubConnection: HubConnection;
  messages: ChatMessage[] = [];
  message =  '';
  isLoading = false;
  // tslint:disable-next-line: no-input-rename
  @Input('class') selectedClass: number;
 constructor(private tools: ToolsService, private authService: AuthenticationService) { }

 ngOnInit(): void {
   this.connect();

 }
 connect() {
   this._hubConnection = new HubConnectionBuilder().withUrl(API + '/api/hubs/chat', {
     transport: HttpTransportType.WebSockets,
     accessTokenFactory: () => {
       return window.localStorage.getItem(JWT_TOKEN);
     }
    },
   ).build();

   this._hubConnection
     .start()
     .then(() => {
       this._hubConnection.invoke('SwitchGroup', this.selectedClass).then(() => {
        this._hubConnection.invoke('SendAllMessages', this.selectedClass).catch(e => this.Handler(e));
       });

       this.tools.showNotification('Connected to the chat');
     })
     .catch(err => {this.tools.showNotification('Error while starting connection');
                    console.log('Error while starting connection: ' + err); });
   this._hubConnection.on('reciveAllMessages', (messages: ChatMessage[]) => {
                     this.messages = messages;
                     this.goDown();
                   });
   this._hubConnection.on('ReciveMessageGroup', (message: ChatMessage) => {
                    this.messages.push(message);
                    this.goDown();
                  });
   this._hubConnection.on('ReciveMessage', (message: ChatMessage) => {
                    this.messages.push(message);
                    this.goDown();
                  });
 }
 Send() {
   if (this.message.indexOf('/ban') !== -1) {
    const args = this.message.split(' ');
    console.log(args);
    this._hubConnection.invoke('BanUser', args[1], args[2], args[3]).catch(e => this.Handler(e));
   } else {
    this._hubConnection.invoke('sendMessage', this.message, this.selectedClass).catch(e => this.Handler(e));
   }

   this.message = '';
 }
 goDown() {
   const chatElement = document.querySelector('.chat');
   setTimeout(() => {
    chatElement.scrollTop = chatElement.scrollHeight;
   }, 0);
 }
 ban(uid) {
   this.message = '/ban ' + uid + ' minutes reason';
 }
 Handler(err) {
   const error = err.message.toString();

   if (error.indexOf('because user is unauthorized') !== -1) {
     this._hubConnection.stop();
     this.authService.Refresh().subscribe(() => {
       this.connect();
     });
   }
 }

}
