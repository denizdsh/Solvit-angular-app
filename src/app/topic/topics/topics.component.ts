import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITopic } from 'src/app/interfaces';
import { category, query, topicType } from 'src/app/shared/util';
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

  constructor(
    private activatedRoute: ActivatedRoute,
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
  }

  private updateTopics() {
    this.service.getTopics[this.type](this.urlProp).subscribe({
      next: (data) => {
        this.topics = data
      },
      error: (e) => { window.alert(e) },
      complete: () => this.isLoading = false
    })
  }
}