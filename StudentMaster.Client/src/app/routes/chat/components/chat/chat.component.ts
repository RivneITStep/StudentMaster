import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { API, JWT_TOKEN, IMG_API } from '@core';
import { ToolsService } from '@core/services/tools.service';
import { AuthenticationService } from '@core/services/authentication.service';
import { Contact } from '@core/models/signalr/contact.model';
import { ChatMessage } from '@core/models/signalr/chatMessage.models';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private _hubConnection: HubConnection;
   contacts: Contact[] = [];
   messages: ChatMessage[] = [];
   selectedId = '';
   message =  '';
   imgAPI = '';

  constructor(private tools: ToolsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.imgAPI = IMG_API;
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
        this.tools.showNotification('Connected to the chat');
        this._hubConnection.invoke('getMyContactsAsync').catch(e => this.Handler(e));
      })
      .catch(err => {this.tools.showNotification('Error while starting connection');
                     console.log('Error while starting connection: ' + err); });
    this._hubConnection.on('Recive', (str: string) => {
                      console.log(str);
                    });
    this._hubConnection.on('ReciveMessage', (message: ChatMessage) => {
                      this.messages.push(message);
                      this.goDown();
                    });
    this._hubConnection.on('ReciveMessages', (messages: ChatMessage[]) => {
                      this.messages = messages;
                      this.goDown();
                    });
    this._hubConnection.on('reciveContacts', (contacts: Contact[]) => {
      console.log(contacts);
      this.contacts = contacts;
      this.contacts.forEach(element => {
                         element.selected = false;
                       });
                     });
  }
  Send() {
    this._hubConnection.invoke('SendToAsync', this.message, this.selectedId).catch(e => this.Handler(e));
    this.message = '';
  }
  onContactChange(contactId) {
    this.selectedId = contactId;
    this.messages = [];
    this.contacts.forEach(element => {

      if (element.selected === true) {
        element.selected = false;
      }

      if (element.id === contactId) {
          element.selected = true;
          this._hubConnection.invoke('getAllMessageWithUser', contactId).catch(e => this.Handler(e));
      }
    });
  }
  goDown() {
    const chatElement = document.querySelector('.chat');
    setTimeout(() => {
     chatElement.scrollTop = chatElement.scrollHeight;
    }, 0);
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
