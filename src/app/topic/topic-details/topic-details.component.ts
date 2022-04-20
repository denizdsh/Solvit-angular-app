import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ITopic, IUser } from 'src/app/interfaces';
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

  constructor(private route: ActivatedRoute, private router: Router, private service: TopicService, private userService: UserService) {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
  }

  get user(): IUser | undefined { return this.userService.user };
  get followingCategories(): category[] { return this.userService.followingCategories };
  get savedTopics(): string[] { return this.userService.savedTopics };
  get isOwner(): boolean { return this.topic._ownerId === this.user?._id };
  get icons() { return icons };
  get saveIconClasses(): string { return 'fas fa-bookmark' + (this.topic._ownerId === this.user?._id ? ' owner' : '') }

  formatDate(date: string): string { return formatDate(date) }

  ngOnInit(): void {
    if (!this.topicId) return;

    this.service.getTopicById(this.topicId).subscribe(
      {
        next: (topic) => {
          console.log(topic);
          this.topic = topic;
        },
        error: (err) => window.alert(err.message)
      }
    )
  }

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

  handler() {
    console.log(this.topic)
  }
}
