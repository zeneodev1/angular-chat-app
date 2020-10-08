import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '@core/services/user.service';
import {User} from '@shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  infoFormGroup: FormGroup;
  user: User;
  @ViewChild('fileInput')
  fileInput: ElementRef;
  showEditPhoto: boolean;
  imageChangeEvent: any;
  constructor(private userService: UserService,
              private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.showEditPhoto = false;
    this.infoFormGroup = new FormGroup(
      {
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        location: new FormControl(this.user.location)
      }
    );
  }

  ngOnInit(): void {
  }

  closeEditPhoto(): void {
    this.showEditPhoto = false;
  }

  saveInfo(): void {
    if (this.infoFormGroup.valid) {
      const user: User = new User();
      user.id = this.user.id;
      user.firstName = this.infoFormGroup.get('firstName').value;
      user.lastName = this.infoFormGroup.get('lastName').value;
      user.email = this.infoFormGroup.get('email').value;
      user.location = this.infoFormGroup.get('location').value;
      user.photo = this.user.photo;
      this.userService.updateUser(user).subscribe(value => {
        console.log(value);
        localStorage.setItem('user', JSON.stringify({user, ...value}));
        this.router.navigate(['chat']);
      });
    }
  }

  onSelectPicture($event): void {
    this.imageChangeEvent = $event;
    const files = $event.target.files;
    if (files !== null && files.length > 0) {
      this.showEditPhoto = true;
    }
  }

  selectPicture(): void {
    this.fileInput.nativeElement.click();
  }

  changePicture(): void {
    this.showEditPhoto = false;
    this.user.photo = this.user.id + '.png';
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
