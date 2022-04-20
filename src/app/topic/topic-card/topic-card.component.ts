import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITopic, IUser } from 'src/app/interfaces';
import { icons, formatDate, category } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent {
  @Input() topic!: ITopic;

  constructor(private router: Router, private service: TopicService, private userService: UserService) { }

  get user(): IUser | undefined { return this.userService.user };
  get followingCategories(): category[] { return this.userService.followingCategories };
  get savedTopics(): string[] { return this.userService.savedTopics };
  get icons() { return icons };
  formatDate(date: string): string { return formatDate(date) };
  
  private unauthorizatedCall(): void {
    this.router.navigate(['/user/login']);
  }

  followHandler(): void {
    if (!this.user) this.unauthorizatedCall();

    this.userService.followCategory(this.topic.category);
    console.log('follow');
  }

  unfollowHandler(): void {
    if (!this.user) this.unauthorizatedCall();

    this.userService.unfollowCategory(this.topic.category);
    console.log('unfollow');
  }

  likeHandler(): void {
    if (!this.user) this.unauthorizatedCall();

    let obs: Observable<string[]>;
    if (this.topic.likes.includes(this.user!._id)) {
      obs = this.service.dislikeTopic(this.topic._id);
    } else {
      obs = this.service.likeTopic(this.topic._id);
    }

    obs.subscribe({
      next: (likes) => {
        this.topic.likes = likes
        this.topic._likesCount = likes.length
      },
      error: (err) => console.error(err)
    })
  }

  saveHandler(): void {
    if (!this.user) this.unauthorizatedCall();

    if (this.savedTopics.includes(this.topic._id)) {
      this.userService.unsaveTopic(this.topic._id);
      console.log('unsave');
    } else {
      this.userService.saveTopic(this.topic._id);
      console.log('save');
    }
  }

  navigateHandler(): void {
    this.router.navigate([`/t/${this.topic._id}`]);
  }
}
