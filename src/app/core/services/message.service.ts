import { Message } from './../../shared/models/message';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url = environment.apiUrl + 'message/';

  constructor(private httpClient: HttpClient) {}

  getAllMessages() {
    return this.httpClient.get(this.url);
  }

  getMessageById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveMessage(message: Message) {
    return this.httpClient.post(this.url, message);
  }

  editMessage(message: Message) {
    return this.httpClient.put(this.url, message);
  }

  deleteMessage(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
