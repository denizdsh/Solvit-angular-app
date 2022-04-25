import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic, ITopicData } from 'src/app/interfaces';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent {
  @Input() topicInput!: ITopic;
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();
  constructor(private router: Router, private service: TopicService) { }

  editTopicHandler(body: ITopicData): void {
    this.service.editTopic(this.topicInput._id, body).subscribe({
      next: (topic) => {
        this.closeCreateTopic.emit(false);
        this.router.navigate(['/'], { skipLocationChange: true })
          .then(() => this.router.navigate(['/t/' + topic._id]))
      },
      error: (err) => console.log(err)
    })
  }
}
