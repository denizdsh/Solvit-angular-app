import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic, IUser } from 'src/app/interfaces';
import { icons, formatDate, category } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent {
  @Input() topic!: ITopic;

  constructor(private router: Router, private userService: UserService) { }

  get user(): IUser | undefined { return this.userService.user };
  get followingCategories(): category[] { return this.userService.followingCategories };
  get savedTopics(): string[] { return this.userService.savedTopics };
  get icons() { return icons };
  formatDate(date: string): string { return formatDate(date) };

  handler() {
    console.log(this.user)
    console.log('action');
  }

  navigateHandler(): void {
    this.router.navigate([`/t/${this.topic._id}`]);
  }
}
