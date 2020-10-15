import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import {InvitationDialogModule} from '@shared/components/invitation-dialog/invitation-dialog.module';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    InvitationDialogModule
  ],
})
export class ChatModule { }
