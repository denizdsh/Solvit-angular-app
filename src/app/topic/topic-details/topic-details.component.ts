import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs';
import { ITopic } from 'src/app/interfaces';
import { icons, formatDate } from 'src/app/shared/util';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topic!: ITopic;
  topicId: string | null;

  constructor(private service: TopicService, private route: ActivatedRoute) {
    this.topicId = this.route.snapshot.paramMap.get('topicId');
  }

  get icons() { return icons };

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
