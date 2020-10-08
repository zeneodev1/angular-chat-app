import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from '@modules/main/profile/profile.component';
import {ChangePasswordModule} from '@modules/main/profile/change-password/change-password.module';

const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'change-password', loadChildren: () => ChangePasswordModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
