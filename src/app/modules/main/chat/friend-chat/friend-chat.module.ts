import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendChatRoutingModule } from './friend-chat-routing.module';
import { FriendChatComponent } from './friend-chat.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [FriendChatComponent],
  imports: [
      CommonModule,
      FriendChatRoutingModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FriendChatModule { }
