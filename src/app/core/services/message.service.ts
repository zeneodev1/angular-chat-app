import * as Stomp from 'stompjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private Stomp = Stomp;
  private websocketUrl = 'ws:localhost:8080/api/chat';
  private connected: boolean;
  private ws: any;


  private apiUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {
    this.connected = false;
  }

  connect(connectedListener): void {
    // connect to stomp where stomp endpoint is exposed
    const socket = new WebSocket(this.websocketUrl);
    this.ws = this.Stomp.over(socket);
    const that = this;
    this.ws.connect({}, (frame) => {
      connectedListener();
      console.log('websocket connected');
    }, (error) => {
    });
  }

  watchMessages(conversationId, callback): void {
    this.ws.subscribe('/topic/messages' + conversationId, callback);
  }

  disconnect(): void {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.connected = false;
    console.log('Disconnected');
  }

  sendMessage(conversationId, message: Message): void {
    const data = JSON.stringify(message);
    this.ws.send('/app/messages/' + conversationId, {}, data);
  }

  getUserMessages(conversationId): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.apiUrl + '/messages/' + conversationId, {
      headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }
      )
    });
  }
}
