import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthModule} from './modules/auth/auth.module';
import {ChatModule} from './modules/chat/chat.module';

const routes: Routes = [
  {path: 'auth', loadChildren: () => AuthModule},
  {path: 'chat', loadChildren: () => ChatModule},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
