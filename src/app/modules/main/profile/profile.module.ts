import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ChangePictureComponent } from './change-picture/change-picture.component';
import {ImageCropperModule} from 'ngx-image-cropper';


@NgModule({
  declarations: [ProfileComponent, ChangePictureComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        ImageCropperModule
    ]
})
export class ProfileModule { }
