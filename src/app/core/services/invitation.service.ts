import { Invitation } from './../../shared/models/invitation';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  url = environment.apiUrl + 'invitation/';

  constructor(private httpClient: HttpClient) {}

  getAllInvitations() {
    return this.httpClient.get(this.url);
  }

  getInvitationById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveInvitation(invitation: Invitation) {
    return this.httpClient.post(this.url, invitation);
  }

  editInvitation(invitation: Invitation) {
    return this.httpClient.put(this.url, invitation);
  }

  deleteInvitation(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
