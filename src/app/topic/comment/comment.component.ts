import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces';
import { formatDate } from 'src/app/shared/util';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: IComment;

  constructor() { }

  get formatDate(): Function { return formatDate; }
  
  ngOnInit(): void {
  }

}
