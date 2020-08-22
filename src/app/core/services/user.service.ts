import { User } from './../../shared/models/user';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl + 'user/';

  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    return this.httpClient.get(this.url);
  }

  getUserById(id: any) {
    return this.httpClient.get(this.url + id);
  }

  saveUser(user: User) {
    return this.httpClient.post(this.url, user);
  }

  editUser(user: User) {
    return this.httpClient.put(this.url, user);
  }

  deleteUser(id: any) {
    return this.httpClient.delete(this.url + id);
  }
}
