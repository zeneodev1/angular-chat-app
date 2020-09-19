import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User;
  public registerForm: FormGroup;
  registerInProgress: boolean;
  public showError: {};
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {
    this.registerInProgress = false;
    this.user = null;
    this.showError = {
      firstName: false,
      lastName: false,
      email: false,
      password: false
    };
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required)
      }
    );
  }

  ngOnInit(): void {
  }

  public registerClick(): void {
    if (!this.registerInProgress && this.registerForm.valid) {
      this.registerInProgress = true;
      this.user = new User();
      this.user.firstName = this.registerForm.get('firstName').value;
      this.user.lastName = this.registerForm.get('lastName').value;
      this.user.email = this.registerForm.get('email').value;
      this.user.password = this.registerForm.get('password').value;
      this.userService.register(this.user).toPromise().catch().then(value => {
        this.userService.login(this.user).toPromise().then(resp => {
          this.loginSuccess(resp.body, resp.headers.get('x-access-token'));
        }).catch(reason => {
          this.errorMessage = 'Something went wrong';
          this.registerInProgress = false;
        });
      }).catch(reason => {
        this.registerInProgress = false;
        this.errorMessage = 'This email already exists';
      });
    } else if (!this.registerForm.valid) {
    }
  }

  onInputFocusOut(fieldName: string): void {
    if (this.registerForm.get(fieldName).invalid) {
      this.showError[fieldName] = true;
    }
  }

  onInputFocus(fieldName: string): void {
    this.showError[fieldName] = false;
  }

  public loginSuccess(user: User, jwt: string): void {
    localStorage.setItem('jwt', jwt);
    this.router.navigate(['welcome']);

    this.user.password = '';
    localStorage.setItem('user', JSON.stringify(user));
  }
}
