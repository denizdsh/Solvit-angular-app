import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-topic-link',
  templateUrl: './create-topic-link.component.html',
  styleUrls: ['./create-topic-link.component.css']
})
export class CreateTopicLinkComponent {
  @Output() triggerCreateTopic = new EventEmitter<boolean>();

  constructor(private router: Router, private userService: UserService) { }

  get user(): IUser | undefined { return this.userService.user; }

  redirectHandler(): void {
    if (this.user) {
      this.triggerCreateTopic.emit(true);
      console.log('create-topic')
      return;
    }

    this.router.navigate(['/user/login']);
  }
}
