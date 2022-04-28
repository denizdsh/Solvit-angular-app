import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { interval, take } from 'rxjs';
import { category, formatCategory } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';

interface ICategoryCard {
  value: category,
  img: URL,
  imgStyles: any
}

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css'],
  animations: [
    trigger('openClosed', [
      state('open', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      state('closed', style({
        overflow: 'hidden',
        height: '0px',
        opacity: '0',
      })),
      transition('open => closed', animate('0.1s')),
      transition('closed => open', animate('0.2s'))
    ])
  ]
})
export class CategoriesMenuComponent {
  @Output() showCategoriesMenu: EventEmitter<boolean> = new EventEmitter();
  shouldMenuClose: boolean = true;

  categories: ICategoryCard[] = [
    {
      value: 'javascript',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png' as unknown as URL,
      imgStyles: { background: '#F7E018' }
    },
    {
      value: 'java',
      img: 'https://camo.githubusercontent.com/537ff5237f38eda1091ba7221dde258733ac6de30a36fbda5be8d3c4364eba1a/68747470733a2f2f63646e2e766f782d63646e2e636f6d2f7468756d626f722f5f416f625a5a44745f525653746b745652376d555a70426b6f76633d2f3078303a363430783432372f31323030783830302f66696c746572733a666f63616c283078303a36343078343237292f63646e2e766f782d63646e2e636f6d2f6173736574732f313038373133372f6a6176615f6c6f676f5f3634302e6a7067' as unknown as URL,
      imgStyles: { background: 'white' }
    },
    {
      value: 'csharp',
      img: 'https://images.ctfassets.net/23aumh6u8s0i/1IKVNqiLhNURzZXp652sEu/4379cfba19f0e19873af6074d3017f70/csharp' as unknown as URL,
      imgStyles: { background: '#58378D' }
    },
    {
      value: 'python',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/640px-Python-logo-notext.svg.png' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'c++',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/640px-ISO_C%2B%2B_Logo.svg.png' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'php',
      img: 'https://prabidhilabs.com/wp-content/uploads/2018/06/php-e8c6425acd65e1cbc012639ad25598c7.png' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'devops',
      img: 'https://www.obsidiantechnologies.io/images/devops.png' as unknown as URL,
      imgStyles: { background: 'white' }
    },
    {
      value: 'qa',
      img: 'https://top.host/blog/wp-content/uploads/2019/09/image-1.png' as unknown as URL,
      imgStyles: { background: '#5AABB2' }
    },
    {
      value: 'front-end',
      img: 'https://trio.dev/static/46a74b0f7c9b47353ea207a29731bc51/263a75529a1752b75d64f9f21fd07c92.jpg' as unknown as URL,
      imgStyles: { background: '#222725' }
    },
    {
      value: 'react',
      img: 'https://reactjs.org/logo-og.png' as unknown as URL,
      imgStyles: { background: '#222222' }
    },
    {
      value: 'jquery',
      img: 'https://avatars.githubusercontent.com/u/70142?s=200&v=4' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'angular',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'vue.js',
      img: 'https://avatars.githubusercontent.com/u/6128107?s=280&v=4' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'back-end',
      img: 'https://alterrasoft.com/wp-content/uploads/2019/05/backend-for-article-2.jpg' as unknown as URL,
      imgStyles: { background: '#2D3E50' }
    },
    {
      value: 'node.js',
      img: 'https://nodejs.org/static/images/logo.svg' as unknown as URL,
      imgStyles: { background: '#262B36' }
    },
    {
      value: 'spring',
      img: 'https://spring.io/images/OG-Spring.png' as unknown as URL,
      imgStyles: { background: 'white' }
    },
    {
      value: 'asp.net',
      img: 'http://static.gunnarpeipman.com/wp-content/uploads/2020/09/aspnet-featured.png' as unknown as URL,
      imgStyles: { background: 'white' }
    },
    {
      value: 'django',
      img: 'https://www.djangoproject.com/m/img/logos/django-logo-negative.png' as unknown as URL,
      imgStyles: { background: '#103E2E' }
    },
    {
      value: 'other',
      img: 'https://groupprojects.org/wp-content/uploads/2021/12/computer-information-systems-vs-information-technology-illustration.jpeg' as unknown as URL,
      imgStyles: { background: '#A4CEE7' }
    },
  ]

  constructor(private userService: UserService) {
    interval(0).pipe(take(1)).subscribe(() => this.shouldMenuClose = false)
  }

  get formatCategory(): Function { return formatCategory; }
  get followedCategories(): category[] { return this.userService.followedCategories; }

  emitHandler(value: boolean) {
    this.shouldMenuClose = true;
    this.showCategoriesMenu.emit(value);
  }

  followHandler(category: category) {
    this.userService.followCategory(category);
  }

  unfollowHandler(category: category) {
    this.userService.unfollowCategory(category);
  }
}
