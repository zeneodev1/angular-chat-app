import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {ChatModule} from '@modules/main/chat/chat.module';
import {ProfileModule} from '@modules/main/profile/profile.module';

const routes: Routes = [
  {path: '', redirectTo: '/chat', pathMatch: 'full'},
  {path: '', component: MainComponent, children: [
      {path: 'chat', loadChildren: () => ChatModule},
      {path: 'profile', loadChildren: () => ProfileModule}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
