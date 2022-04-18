import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs';
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

  constructor(private route: ActivatedRoute, private service: TopicService, private userService: UserService) {
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

  handler() {
    console.log('action');
  }
}
