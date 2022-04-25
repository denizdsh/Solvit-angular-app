import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ITopic, ITopicData } from 'src/app/interfaces';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent {
  @Output() closeCreateTopic: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private service: TopicService) { }

  createTopicHandler(body: ITopicData): void {
    this.service.createTopic(body).subscribe({
      next: (topic) => {
        this.closeCreateTopic.emit(false);
        this.router.navigate(['/t/' + topic._id])
      },
      error: (err) => console.log(err)
    })
  }
}
