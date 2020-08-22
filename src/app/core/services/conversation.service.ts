import { Conversation } from './../../shared/models/conversation';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  url = environment.apiUrl + 'conversation/';

  constructor(private httpClient: HttpClient) {}

  getAllConversations() {
    return this.httpClient.get(this.url);
  }

  getConversationById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveConversation(conversation: Conversation) {
    return this.httpClient.post(this.url, conversation);
  }

  editConversation(conversation: Conversation) {
    return this.httpClient.put(this.url, conversation);
  }

  deleteConversation(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
