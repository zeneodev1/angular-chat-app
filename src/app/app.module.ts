import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from './core/services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {RxStompService} from '@stomp/ng2-stompjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RxStompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
