import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from '@modules/main/chat/chat.component';
import {FriendChatModule} from '@modules/main/chat/friend-chat/friend-chat.module';

const routes: Routes = [
  {path: '', component: ChatComponent, children: [
      {path: ':conId', loadChildren: () => FriendChatModule}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
