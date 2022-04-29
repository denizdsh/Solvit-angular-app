import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ITopic, IUser } from 'src/app/interfaces';
import { ImageService } from 'src/app/shared/image.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { icons, formatDate, category } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topic!: ITopic;
  topicId: string | null;
  trigger: boolean = false;
  topicHasLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _snackbar: MatSnackBar,
    private service: TopicService,
    private userService: UserService,
  ) {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
  }

  get user(): IUser | undefined { return this.userService.user };
  get followingCategories(): category[] { return this.userService.followedCategories };
  get savedTopics(): string[] { return this.userService.savedTopics };
  get isOwner(): boolean { return this.topic?._ownerId === this.user?._id };
  get icons() { return icons };
  get saveIconClasses(): string { return 'fas fa-bookmark' + (this.topic._ownerId === this.user?._id ? ' owner' : '') }

  formatDate(date: string): string { return formatDate(date) }

  ngOnInit(): void {
    if (!this.topicId) return;

    this.service.getTopicById(this.topicId).subscribe(
      {
        next: (topic) => {
          this.topic = topic;
        },
        error: (err) => {
          this.router.navigate(['/']);
          this._snackbar.openFromComponent(NotificationComponent, {
            data: {
              type: 'error',
              message: 'Couldn\'t load topic.'
            }
          })
        },
        complete: () => this.topicHasLoaded = true
      }
    )
  }

  private unauthorizatedCall(): void {
    this.router.navigate(['/user/login'], { queryParams: { redirect: this.router.routerState.snapshot.url } });
  }

  followHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall();
      return;
    }

    this.userService.followCategory(this.topic.category);
  }

  unfollowHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall();
      return;
    }

    this.userService.unfollowCategory(this.topic.category);
  }

  likeHandler(): void {
    if (!this.user) {
      this.unauthorizatedCall();
      return;
    }

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
      this.unauthorizatedCall();
      return;
    }

    if (this.savedTopics.includes(this.topic._id)) {
      this.userService.unsaveTopic(this.topic._id);
    } else {
      this.userService.saveTopic(this.topic._id);
    }
  }
}