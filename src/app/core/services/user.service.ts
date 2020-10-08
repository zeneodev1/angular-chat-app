import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from './../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
      observe: 'response' as 'response',
      withCredentials: true
    });
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + user.id , user, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !new JwtHelperService().isTokenExpired(localStorage.getItem('jwt'));
  }

  changePassword(changeRequest, userId): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'changePassword' , changeRequest, {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      })
    });
  }

  searchForPeople(q): Observable<any> {
    return this.httpClient.get(this.apiUrl + 'search', {
      headers: new HttpHeaders({
        'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }),
      params: {
        email: q
      }
    });
  }

  uploadPicture(file, userId): Observable<any> {
    const data: FormData = new FormData();
    data.set('image', file);
    return this.httpClient.post(this.apiUrl + userId + '/picture', data,
      {
        headers: new HttpHeaders({
          'X-Authorization': 'Bearer ' + localStorage.getItem('jwt')
        })
      });
  }
}
