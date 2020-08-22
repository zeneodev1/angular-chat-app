import { Message } from '../../shared/models/message.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  apiUrl = environment.apiUrl + 'message/';

  constructor(private httpClient: HttpClient) {}

  getAllMessages() {
    return this.httpClient.get(this.apiUrl);
  }

  getMessageById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  saveMessage(message: Message) {
    return this.httpClient.post(this.apiUrl, message);
  }

  editMessage(message: Message) {
    return this.httpClient.put(this.apiUrl, message);
  }

  deleteMessage(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
