import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FriendChatComponent} from '@modules/main/chat/friend-chat/friend-chat.component';

const routes: Routes = [
  {path: '', component: FriendChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendChatRoutingModule { }
