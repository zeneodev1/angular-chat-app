import * as Stomp from 'stompjs';
import {Message} from '../../shared/models/message.model';

export class WebsocketService {
  stomp = Stomp;
  private websocketUrl = 'ws:localhost:8080/api/chat';
  private connected: boolean;
  private ws: any;
  constructor() {
  }

  connect(connectedListener, errorListener?): void {
    // connect to stomp where stomp endpoint is exposed
    const socket = new WebSocket(this.websocketUrl);
    this.ws = this.stomp.over(socket);
    this.ws.connect({}, (frame) => {
      connectedListener();
    }, (error) => {
      errorListener(error);
    });
  }

  subscribe(brokerEndpoint, listener): void {
    this.ws.subscribe(brokerEndpoint, listener, {});
  }

  disconnect(): void {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.connected = false;
    console.log('Disconnected');
  }

  sendMessage(destination, message: Message): void {
    const data = JSON.stringify(message);
    this.ws.send(destination, {}, data);
  }
}
