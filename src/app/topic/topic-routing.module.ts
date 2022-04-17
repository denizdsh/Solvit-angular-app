import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicsComponent } from './topics/topics.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicsComponent
  },
  {
    path: 'all',
    pathMatch: 'full',
    component: TopicsComponent
  },
  {
    path: 'saved',
    pathMatch: 'full',
    component: TopicsComponent
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
