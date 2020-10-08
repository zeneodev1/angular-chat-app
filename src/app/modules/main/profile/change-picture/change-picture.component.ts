import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {UserService} from '@core/services/user.service';
import {User} from '@shared/models/user.model';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.css']
})
export class ChangePictureComponent implements OnInit {
  @Output()
  closeWindow: EventEmitter<void>;
  @Input()
  imageChangedEvent: any;
  uploading: boolean;
  base64: string;
  @Output()
  savePicture: EventEmitter<any>;
  constructor(private userService: UserService) {
    this.closeWindow = new EventEmitter<void>();
    this.savePicture = new EventEmitter<any>();
    this.uploading = false;
  }

  ngOnInit(): void {
  }

  loadImageFailed(): void {
  }

  cropperReady(): void {
  }

  imageLoaded(): void {
  }

  imageCropped($event: ImageCroppedEvent): void {
    this.base64 = $event.base64;
  }


  uploadPicture(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    fetch(this.base64).then(res => res.blob())
      .then(blob => {
        this.uploading = true;
        this.userService.uploadPicture(new File([blob], 'picture.png', { type: 'image/png' }), user.id).subscribe(value => {
          this.savePicture.emit();
        });
      });
  }
}
