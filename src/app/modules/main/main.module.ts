import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { InvitaionDialogComponent } from './invitaion-dialog/invitaion-dialog.component';
import {StoreModule} from '@ngrx/store';
import {messageReducer} from '@core/store/reducer/message.reducer';
import {invitationReducer} from '@core/store/reducer/invitation.reducer';
import { InvitationsNotificationComponent } from './invitations-notification/invitations-notification.component';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [MainComponent, InvitaionDialogComponent, InvitationsNotificationComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forRoot({message: messageReducer, invitation: invitationReducer}),
  ],
})
export class MainModule { }
