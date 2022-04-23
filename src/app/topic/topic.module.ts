import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopicsComponent } from './topics/topics.component';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicHeadingComponent } from './topic-heading/topic-heading.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicCardComponent,
    TopicDetailsComponent,
    CreateTopicComponent,
    TopicHeadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    FontAwesomeModule,
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }
