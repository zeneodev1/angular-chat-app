import { Conversation } from '../../shared/models/conversation.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  apiUrl = environment.apiUrl + 'conversation/';

  constructor(private httpClient: HttpClient) {}

  getAllConversations() {
    return this.httpClient.get(this.apiUrl);
  }

  getConversationById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  saveConversation(conversation: Conversation) {
    return this.httpClient.post(this.apiUrl, conversation);
  }

  editConversation(conversation: Conversation) {
    return this.httpClient.put(this.apiUrl, conversation);
  }

  deleteConversation(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
