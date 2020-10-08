import * as Stomp from 'stompjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Message} from '../../shared/models/message.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MessageService {


  private apiUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {
  }

  getUserMessages(conversationId): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.apiUrl + 'messages/' + conversationId, {
      headers: new HttpHeaders({
          'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      )
    });
  }
}
