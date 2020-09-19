import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'user/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  public register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'register', user);
  }

  public login(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'login', user, {
      observe: 'response'
    });
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(this.apiUrl, user);
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !new JwtHelperService().isTokenExpired(localStorage.getItem('jwt'));
  }
}
