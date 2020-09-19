import { Component, OnInit } from '@angular/core';
import {UserService} from '@core/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  profileCollapsed: boolean;
  constructor(private userService: UserService, private router: Router) {
    this.profileCollapsed = true;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['auth/login']);
  }

  expandCollapseProfile(): void {
    this.profileCollapsed = !this.profileCollapsed;
  }
}
