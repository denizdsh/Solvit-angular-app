import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { icons } from 'src/app/shared/util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin: boolean;
  title: string;
  iconClassList: string;

  constructor(private router: Router) {
    this.isLogin = router.url.toString().includes('login');
    this.title = this.isLogin ? 'Login' : 'Register';
    console.log(router.url);
    console.log(this.isLogin);

    this.iconClassList = 'auth-bg-icon ' + (this.isLogin ? '' : 'auth-page-register')
  }

  get icons() { return icons };
}
