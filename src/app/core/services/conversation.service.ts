import { Conversation } from '../../shared/models/conversation.model';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUserConversations(userId): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(this.apiUrl + 'conversations/' + userId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  getConversationById(convId: string): Observable<Conversation> {
    return this.httpClient.get(this.apiUrl + 'conversation/' + convId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

}
