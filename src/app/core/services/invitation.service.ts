import { Invitation } from '../../shared/models/invitation.model';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  apiUrl = environment.apiUrl + 'invitations/';

  constructor(private httpClient: HttpClient) {}

  getAllInvitations(userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'all/' + userId, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  getAllImportantInvitations(userId): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'important/' + userId, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  sendInvitation(userId, personId): Observable<any> {
    return this.httpClient.post(this.apiUrl + userId + '/' + personId, null, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }
  acceptInvitation(userId, personId): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'accept/' + personId + '/' + userId, null, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }
}
