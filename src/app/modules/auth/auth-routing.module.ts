import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '', component: AuthComponent, children: [
      {path: 'login', loadChildren: () => LoginModule},
      {path: 'register', loadChildren: () => RegisterModule}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class AuthRoutingModule { }
