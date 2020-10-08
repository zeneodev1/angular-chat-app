import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@core/services/user.service';
import {User} from '@shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordFormGroup: FormGroup;
  user: User;
  constructor(private userService: UserService,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.passwordFormGroup = new FormGroup(
      {
        oldPassword: new FormControl(null, [Validators.required, Validators.min(6)]),
        newPassword: new FormControl(null, [Validators.required, Validators.min(6)]),
        newPasswordConfirmation: new FormControl(null, [Validators.required, Validators.min(6)])
      }
    );
  }

  ngOnInit(): void {
  }

  savePassword(): void {
    if (this.passwordFormGroup.valid) {
      if (this.passwordFormGroup.get('newPassword').value
        === this.passwordFormGroup.get('newPasswordConfirmation').value) {
        const changePasswordRequest = {
          id: this.user.id,
          oldPassword: this.passwordFormGroup.get('oldPassword').value,
          newPassword: this.passwordFormGroup.get('newPassword').value
        };
        console.log(changePasswordRequest);
        this.userService.changePassword(changePasswordRequest, this.user.id).toPromise().then(value => {
          this.router.navigate(['chat']);
        });
      }
    }
  }
}
