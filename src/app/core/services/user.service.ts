import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'user/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  public register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/auth/register', user);
  }

  public login(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/login', user, {
      observe: 'body',
      responseType: 'text',
    });
  }

  getAllUsers() {
    return this.httpClient.get(this.apiUrl);
  }

  getUserById(id: any) {
    return this.httpClient.get(this.apiUrl + id);
  }

  editUser(user: User) {
    return this.httpClient.put(this.apiUrl, user);
  }

  deleteUser(id: any) {
    return this.httpClient.delete(this.apiUrl + id);
  }

  public loginSuccess(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.router.navigate(['chat']);
  }
}
