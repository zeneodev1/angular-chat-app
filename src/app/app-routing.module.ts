import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthModule} from './modules/auth/auth.module';
import {WelcomeModule} from '@modules/welcome/welcome.module';
import {AuthGuard} from '@core/guards/auth.guard';
import {MainModule} from '@modules/main/main.module';

const routes: Routes = [
  {path: 'auth', loadChildren: () => AuthModule},
  {path: '', loadChildren: () => MainModule, canActivate: [AuthGuard]},
  {path: 'welcome', loadChildren: () => WelcomeModule, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
