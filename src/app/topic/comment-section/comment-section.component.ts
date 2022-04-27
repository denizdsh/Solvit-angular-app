import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IComment } from 'src/app/interfaces';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
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

  constructor(private router: Router, private _snackbar: MatSnackBar, private service: TopicService, private userService: UserService) { }

  get isAuth(): boolean { return this.userService.isAuth; }

  ngOnInit(): void {
    this.service.getComments(this.topicId).subscribe({
      next: (comments) => this.comments = comments,
      error: (err) => {
        console.log(err)
        this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            message: 'Coulndn\'t load comments',
            type: 'error'
          }
        })
      },
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
      error: (err) => {
        this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            message: err.error.message || 'Coulndn\'t post comment',
            type: 'error'
          }
        })
      },
      complete: () => {
        form.reset()
        this._snackbar.openFromComponent(NotificationComponent, {
          data: {
            type: 'success',
            message: 'Successfully commented.'
          }
        })
      }
    })
  }

  redirectHandler(): void {
    if (!this.isAuth) {
      this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          message: 'You have to be authenticated to comment.',
          type: 'warning'
        }
      })
      this.router.navigate(['/user/login'], { queryParams: { redirect: this.router.routerState.snapshot.url } })
    }
  }
}
