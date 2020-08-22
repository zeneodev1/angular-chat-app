import { Invitation } from '../../shared/models/invitation.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  apiUrl = environment.apiUrl + 'invitation/';

  constructor(private httpClient: HttpClient) {}

  getAllInvitations() {
    return this.httpClient.get(this.apiUrl);
  }

  getInvitationById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  saveInvitation(invitation: Invitation) {
    return this.httpClient.post(this.apiUrl, invitation);
  }

  editInvitation(invitation: Invitation) {
    return this.httpClient.put(this.apiUrl, invitation);
  }

  deleteInvitation(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
