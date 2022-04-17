import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic } from 'src/app/interfaces';
import { icons, formatDate } from 'src/app/shared/util';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent {
  @Input() topic!: ITopic;

  constructor(private router: Router){}

  get icons() { return icons };
  formatDate(date: string): string { return formatDate(date) };

  handler() {
    console.log('action');
  }

  navigateHandler():void{
    this.router.navigate([`/t/${this.topic._id}`]);
  }
}
