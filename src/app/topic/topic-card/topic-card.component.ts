import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ITopic, IUser } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
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

  constructor(private router: Router, private _snackbar: MatSnackBar, private service: TopicService, private userService: UserService) { }

  get user(): IUser | undefined { return this.userService.user };
  get followingCategories(): category[] { return this.userService.followingCategories };
  get savedTopics(): string[] { return this.userService.savedTopics };
  get icons() { return icons };
  formatDate(date: string): string { return formatDate(date) };

  private unauthorizatedCall(): void {
    let queryParams: any = { redirect: this.router.routerState.snapshot.url };

    if (this.router.routerState.snapshot.url.startsWith('/all')) queryParams = {};

    this.router.navigate(['/user/login'], { queryParams });

    this._snackbar.openFromComponent(NotificationComponent, {
      data: {
        message: 'You have to be authenticated to perform such actions.',
        type: 'warning'
      }
    })
  }

  followHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall()
      return;
    };

    this.userService.followCategory(this.topic.category);
  }

  unfollowHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall()
      return;
    };

    this.userService.unfollowCategory(this.topic.category);
  }

  likeHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall()
      return;
    };

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
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || 'Couldn\'t perform action.'
        }
      })
    })
  }

  saveHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall()
      return;
    };

    if (this.savedTopics.includes(this.topic._id)) {
      this.userService.unsaveTopic(this.topic._id);
    } else {
      this.userService.saveTopic(this.topic._id);
    }
  }

  navigateHandler(): void {
    this.router.navigate([`/t/${this.topic._id}`]);
  }
}
