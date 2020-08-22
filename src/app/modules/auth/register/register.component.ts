import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/models/user.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: User;
  public registerForm: FormGroup;
  private registerInProgress: boolean;
  public errorMessage: string;

  constructor(private userService: UserService) {
    this.registerInProgress = false;
    this.user = null;
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
          this.userService.loginSuccess(resp);
        });
      }).catch(reason => {
        this.registerInProgress = false;
      });
    } else if (!this.registerForm.valid) {
    }
  }

}
