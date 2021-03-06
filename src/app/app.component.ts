import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'solvit';

  constructor(private userService: UserService) { }

  get isAuthProcessFinished() { return this.userService.isAuthProcessFinished; }

  ngOnInit(): void {
    this.userService.persistedLogin();
  }
}