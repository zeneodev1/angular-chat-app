import { UserProfile } from './../../shared/models/user-profile';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  url = environment.apiUrl + 'userProfile/';

  constructor(private httpClient: HttpClient) {}

  getAllUserProfiles() {
    return this.httpClient.get(this.url);
  }

  getUserProfileById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveUserProfile(userProfile: UserProfile) {
    return this.httpClient.post(this.url, userProfile);
  }

  editUserProfile(userProfile: UserProfile) {
    return this.httpClient.put(this.url, userProfile);
  }

  deleteUserProfile(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
