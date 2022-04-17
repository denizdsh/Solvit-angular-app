import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopicsComponent } from './topics/topics.component';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicCardComponent,
    TopicDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    FontAwesomeModule,
    TopicRoutingModule,
  ]
})
export class TopicModule { }
