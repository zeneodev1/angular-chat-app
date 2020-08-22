import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080/api';
  constructor(private httpClient: HttpClient, private router: Router) { }
  public register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/auth/register', user);
  }

  public login(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/login', user, {
      observe: 'body',
      responseType: 'text'
    });
  }

  public loginSuccess(jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.router.navigate(['chat']);
  }
}
