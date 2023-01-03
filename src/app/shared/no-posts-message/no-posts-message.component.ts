import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { topicType } from '../util';

@Component({
  selector: 'app-no-posts-message',
  templateUrl: './no-posts-message.component.html',
  styleUrls: ['./no-posts-message.component.css']
})
export class NoPostsMessageComponent {
  @Input() type!: topicType;
  @Input() username: string | undefined;

  constructor(private userService: UserService) { }

  get message(): string {
    switch (this.type) {
      case 'followed':
        if (this.userService.followedCategories.length === 0)
          return 'You haven\'t followed any categories yet';

        return 'No topics in the categories you\'ve followed yet';

      case 'saved':
        return 'You haven\'t saved any topics yet';

      case 'user':
        return `${this.username} has not posted yet`

      default: return 'No topics yet. Be the first to post one!';
    }
  }
}