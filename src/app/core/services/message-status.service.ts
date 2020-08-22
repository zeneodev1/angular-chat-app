import { MessageStatus } from '../../shared/models/message-status.model';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageStatusService {
  apiUrl = environment.apiUrl + 'messageStatus/';

  constructor(private httpClient: HttpClient) {}

  getAllMessageStatuss() {
    return this.httpClient.get(this.apiUrl);
  }

  getMessageStatusById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  saveMessageStatus(messageStatus: MessageStatus) {
    return this.httpClient.post(this.apiUrl, messageStatus);
  }

  editMessageStatus(messageStatus: MessageStatus) {
    return this.httpClient.put(this.apiUrl, messageStatus);
  }

  deleteMessageStatus(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
