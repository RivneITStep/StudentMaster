import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';
import { ChatMessage } from '@core/models/signalr/chatMessage.models';
import { ToolsService } from '@core/services/tools.service';
import { AuthenticationService, IMG_API, API, JWT_TOKEN } from '@core';
import { Contact } from '@core/models/signalr/contact.model';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  private _hubConnection: HubConnection;
   messages: ChatMessage[] = [];
   message =  '/help';
   isLoading = false;
  constructor(private tools: ToolsService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.connect();

  }
  connect() {
    this._hubConnection = new HubConnectionBuilder().withUrl(API + '/api/hubs/console', {
      transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => {
        return window.localStorage.getItem(JWT_TOKEN);
      }
     },
    ).build();

    this._hubConnection
      .start()
      .then(() => {
        this.Send();
        this.tools.showNotification('Connected to @console');
      })
      .catch(err => {this.tools.showNotification('Error while starting connection');
                     console.log('Error while starting connection: ' + err); });
    this._hubConnection.on('reciveCmd', (message: ChatMessage) => {
                      this.messages.push(message);
                      this.goDown();
                    });
  }
  Send() {
    this._hubConnection.invoke('Execute', this.message).catch(e => this.Handler(e));
    this.message = '';
  }
  goDown() {
    const chatElement = document.querySelector('.chat');
    setTimeout(() => {
     chatElement.scrollTop = chatElement.scrollHeight;
    }, 0);
  }
  saveCommand(cmd: string) {
    this.message =  cmd.split('|')[0];
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
  Clear() {
    this.messages = [];
  }
  Help() {
    this._hubConnection.invoke('Execute', '/help').catch(e => this.Handler(e));
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

}
