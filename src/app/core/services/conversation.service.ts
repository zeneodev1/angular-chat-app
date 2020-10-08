import { Conversation } from '../../shared/models/conversation.model';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ChangeEvent} from '@shared/models/changeevent.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getUserConversations(userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'conversations/' + userId, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  listenToUserConversations(userId): Observable<ChangeEvent<Conversation>> {
    return Observable.create((observer) => {
      const es = new EventSource(this.apiUrl + 'live/conversations/' + userId, {withCredentials: true});
      es.onmessage = (message) => {
        console.log(JSON.parse(message.data));
        observer.next(JSON.parse(message.data));
      };
      es.onerror = (message) => {
        es.close();
        observer.complete();
      };
    });
  }

  getConversationById(convId: string): Observable<Conversation> {
    return this.httpClient.get(this.apiUrl + 'conversation/' + convId, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

}
