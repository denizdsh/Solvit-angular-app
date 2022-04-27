import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ITopic, IUser } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { category, query, topicType } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';
import { TopicService } from '../topic.service';

type urlTopicType = 'all' | '' | 'c' | 'u' | 'saved';
type urlProp = category & (query | undefined) & string;

const topicsType = {
  all: 'all',
  '': 'followed',
  c: 'category',
  u: 'user',
  saved: 'saved'
}

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  type!: topicType;
  urlProp!: urlProp;
  topics: ITopic[] | undefined;
  isLoading: boolean = true;
  trigger: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _snackbar: MatSnackBar,
    private service: TopicService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe({
      next: (newUrl) => {
        this.isLoading = true;

        this.urlProp = newUrl[1]?.path as urlProp;
        this.type = topicsType[(newUrl[0]?.path || '') as urlTopicType] as topicType;
        console.log(this.type)
        this.updateTopics()
      }
    })

    this.activatedRoute.queryParams.subscribe({
      next: () => this.updateTopics()
    })
  }

  private updateTopics() {
    let query = {
      sortBy: this.activatedRoute.snapshot.queryParams['sortBy'],
      order: this.activatedRoute.snapshot.queryParams['order']
    };

    this.service.getTopics[this.type](this.urlProp || query, query).subscribe({
      next: (data) => {
        this.topics = data
      },
      error: (err) => {
        console.log(err); this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            type: 'error',
            message: err.error.message || 'Couldn\'t load topics.'
          }
        })
      },
      complete: () => this.isLoading = false
    })
  }
}