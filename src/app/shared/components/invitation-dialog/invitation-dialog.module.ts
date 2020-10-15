import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvitationDialogComponent} from './invitation-dialog.component';



@NgModule({
  declarations: [InvitationDialogComponent],
  exports: [
    InvitationDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvitationDialogModule { }
