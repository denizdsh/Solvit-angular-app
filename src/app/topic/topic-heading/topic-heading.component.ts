import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { topicType, formatCategory } from 'src/app/shared/util';
import { Router } from '@angular/router';

type headingType = 'underlined' | 'user' | null;
const heading = {
  'all': 'underlined',
  'followed': null,
  'category': 'underlined',
  'user': 'user',
  'saved': 'underlined'
}

@Component({
  selector: 'app-topic-heading',
  templateUrl: './topic-heading.component.html',
  styleUrls: ['./topic-heading.component.css']
})
export class TopicHeadingComponent implements OnChanges {
  @Input() topicsType!: topicType;
  @Input() content!: string;
  type!: headingType;
  username: string | undefined;
  imageUrl: URL | undefined;

  constructor(private router: Router, private userService: UserService) { }
  get formatCategory(): Function { return formatCategory; }

  ngOnChanges(): void {
    this.type = heading[this.topicsType] as headingType;
    if (!this.content) this.content = this.topicsType;

    if (this.type == 'user') {
      console.log('updated user image')
      this.userService.getUserImage(this.content).subscribe({
        next: (image) => this.imageUrl = image,
        error: () => {
          window.alert('No such user')
          this.router.navigate(['/']);
        }
      })
    };
  }
}
