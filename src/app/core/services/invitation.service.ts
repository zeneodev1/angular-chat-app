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

}
