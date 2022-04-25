import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicsComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: '/all'
    }
  },
  {
    path: 'all',
    pathMatch: 'full',
    component: TopicsComponent
  },
  {
    path: 'saved',
    pathMatch: 'full',
    component: TopicsComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: '/user/login'
    }
  },
  {
    path: 'c/:category',
    pathMatch: 'full',
    component: TopicsComponent
  },
  {
    path: 'u/:userId',
    pathMatch: 'full',
    component: TopicsComponent
  },
  {
    path: 't/:topicId',
    pathMatch: 'full',
    component: TopicDetailsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TopicRoutingModule { }
