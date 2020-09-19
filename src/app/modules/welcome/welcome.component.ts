import { Component, OnInit } from '@angular/core';
import {UserService} from '@core/services/user.service';
import {User} from '@shared/models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {
    this.user = userService.getUserFromStorage();
  }

  ngOnInit(): void {
  }

}
