import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopicsComponent } from './topics/topics.component';
import { TopicRoutingModule } from './topic-routing.module';
import { TopicCardComponent } from './topic-card/topic-card.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { TopicHeadingComponent } from './topic-heading/topic-heading.component';
import { SharedModule } from '../shared/shared.module';
import { CreateTopicLinkComponent } from './create-topic-link/create-topic-link.component';
import { TopicFormComponent } from './topic-form/topic-form.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { CommentComponent } from './comment/comment.component';
import { AsideComponent } from './aside/aside.component';
import { SortAsideComponent } from './sort-aside/sort-aside.component';
import { CategoriesMenuComponent } from './categories-menu/categories-menu.component';
import { CategoriesMenuButtonComponent } from './categories-menu-button/categories-menu-button.component';

@NgModule({
  declarations: [
    TopicsComponent,
    TopicCardComponent,
    TopicDetailsComponent,
    CreateTopicComponent,
    TopicHeadingComponent,
    CreateTopicLinkComponent,
    TopicFormComponent,
    EditTopicComponent,
    CommentSectionComponent,
    CommentComponent,
    AsideComponent,
    SortAsideComponent,
    CategoriesMenuComponent,
    CategoriesMenuButtonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FontAwesomeModule,
    TopicRoutingModule,
    SharedModule
  ]
})
export class TopicModule { }
