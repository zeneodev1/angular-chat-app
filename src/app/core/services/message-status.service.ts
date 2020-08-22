import { MessageStatus } from './../../shared/models/message-status';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageStatusService {
  url = environment.apiUrl + 'messageStatus/';

  constructor(private httpClient: HttpClient) {}

  getAllMessageStatuss() {
    return this.httpClient.get(this.url);
  }

  getMessageStatusById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveMessageStatus(messageStatus: MessageStatus) {
    return this.httpClient.post(this.url, messageStatus);
  }

  editMessageStatus(messageStatus: MessageStatus) {
    return this.httpClient.put(this.url, messageStatus);
  }

  deleteMessageStatus(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
