import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {User} from '../../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  public loginForm: FormGroup;
  loginInProgress: boolean;
  public errorMessage: string;
  constructor(private userService: UserService, private router: Router) {
    this.loginInProgress = false;
    this.user = null;
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      }
    );
  }

  ngOnInit(): void {
  }

  public loginClick(): void {
    if (!this.loginInProgress && this.loginForm.valid) {
      this.loginInProgress = true;
      this.user = new User();
      this.user.email = this.loginForm.get('email').value;
      this.user.password = this.loginForm.get('password').value;
      this.userService.login(this.user).toPromise().then(resp => {
        const token = resp.headers.get('X-Authorization');
        const user = resp.body;
        this.loginSuccess(user, token);
      }).catch(reason => {
        this.loginInProgress = false;
        this.errorMessage = 'Email or password is not correct';
      });
    } else if (!this.loginForm.valid) {
    }
  }


  public loginSuccess(user: User, jwt: string): void {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['chat']);
  }
}
