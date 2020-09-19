import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendChatRoutingModule } from './friend-chat-routing.module';
import { FriendChatComponent } from './friend-chat.component';


@NgModule({
  declarations: [FriendChatComponent],
  imports: [
    CommonModule,
    FriendChatRoutingModule
  ]
})
export class FriendChatModule { }
