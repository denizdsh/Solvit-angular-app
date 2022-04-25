import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-posts-message',
  templateUrl: './no-posts-message.component.html',
  styleUrls: ['./no-posts-message.component.css']
})
export class NoPostsMessageComponent {
  @Input() message!: string;
}