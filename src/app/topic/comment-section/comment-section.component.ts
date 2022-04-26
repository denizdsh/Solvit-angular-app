import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces';
import { UserService } from 'src/app/user/user.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() topicId!: string;
  comments!: IComment[];
  commentsHaveLoaded: boolean = false;

  constructor(private router: Router, private service: TopicService, private userService: UserService) { }

  get isAuth(): boolean { return this.userService.isAuth; }

  ngOnInit(): void {
    this.service.getComments(this.topicId).subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => console.log(err),
      complete: () => this.commentsHaveLoaded = true
    })
  }

  commentHandler(form: NgForm): void {
    if (form.invalid) return;

    const content = form.value.content.trim();
    if (!content) {
      form.reset();
      return;
    }

    this.service.postComment(this.topicId, content).subscribe({
      next: (comment) => this.comments.unshift(comment),
      error: (err) => console.log(err),
      complete: () => form.reset()
    })
  }

  redirectHandler(): void {
    if (!this.isAuth) {
      window.alert('notification: not auth')
      this.router.navigate(['/user/login'], { queryParams: { redirect: this.router.routerState.snapshot.url } })
    }
  }
}
