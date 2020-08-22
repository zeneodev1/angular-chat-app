import { UserProfile } from '../../shared/models/user-profile.model';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  apiUrl = environment.apiUrl + 'userProfile/';

  constructor(private httpClient: HttpClient) {}

  getAllUserProfiles() {
    return this.httpClient.get(this.apiUrl);
  }

  getUserProfileById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  saveUserProfile(userProfile: UserProfile) {
    return this.httpClient.post(this.apiUrl, userProfile);
  }

  editUserProfile(userProfile: UserProfile) {
    return this.httpClient.put(this.apiUrl, userProfile);
  }

  deleteUserProfile(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
