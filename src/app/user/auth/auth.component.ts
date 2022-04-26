import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { icons } from 'src/app/shared/util';
import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('toggleAvatarViewer', [
      state('open', style({
        height: '24rem'
      })),
      state('closed', style({
        left: '50%',
        height: '0rem'
      })),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')])
    ])
  ]
})
export class AuthComponent {
  title: string;
  type: 'login' | 'register' | 'edit-profile';
  imageUrl: URL | undefined;

  constructor(activatedRoute: ActivatedRoute, private userService: UserService) {
    this.type = activatedRoute.snapshot.data['authFormType'];
    this.title = this.type[0].toLocaleUpperCase().concat(this.type.replace('-', ' ').slice(1));
  }

  get icons() { return icons };
  get user(): IUser | undefined { return this.userService.user; }
}
