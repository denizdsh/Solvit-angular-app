import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITopic } from 'src/app/interfaces';
import { category, query } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';
import { TopicService } from '../topic.service';

type urlTopicType = 'all' | '' | 'c' | 'u' | 'saved';
type topicType = 'all' | 'followed' | 'category' | 'user' | 'saved';
type urlProp = category & (query | undefined) & string;

const categories = {
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TopicService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe({
      next: (newUrl) => {
        this.urlProp = newUrl[1]?.path as urlProp;
        this.type = categories[(newUrl[0]?.path || '') as urlTopicType] as topicType;

        this.updateTopics()
      }
    })
  }

  private updateTopics() {
    this.service.getTopics[this.type](this.urlProp).subscribe({
      next: (data) => {
        this.topics = data
      },
      error: (e) => { window.alert(e) }
    })
  }
}