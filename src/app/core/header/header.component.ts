import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { state, style, transition, trigger, animate } from '@angular/animations';
import { icons } from 'src/app/shared/util';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('avatar', [
      state('active', style({
        height: 'calc(3rem + 6px)',
        width: 'calc(3rem + 6px)',
        transform: 'translate(-3px, calc(-100% + 3px))'
      })),
      state('inactive', style({
        height: '0',
        width: '0',
        transform: 'translate(1.5rem, calc(-100% + 3px))'

      })),
      transition('inactive => active', animate('0.3s')),
      transition('active => inactive', animate('0.1s')),
    ]),
    trigger('upper-avatar', [
      state('active', style({
        height: 'calc(3rem + 6px)',
        width: 'calc(3rem + 6px)',
        transform: 'translate(-3px, -3px)'
      })),
      state('inactive', style({
        height: '0',
        width: '0',
        transform: 'translate(1.5rem, -3px)'

      })),
      transition('inactive => active', animate('0.3s')),
      transition('active => inactive', animate('0.1s')),
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('dropdownBtn') dropdownBtn!: ElementRef;
  @ViewChild('avatar') avatar!: ElementRef;
  activeCategoryMenu: ' active-dropdown-menu' | '' = '';
  userMenuIsOpen: boolean = false;


  constructor(private router: Router, private renderer: Renderer2, private userService: UserService) { }

  get isAuth(): boolean { return !!this.userService.user };

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: PointerEvent): void => {
      if (e.target == this.dropdownBtn.nativeElement) {
        this.activeCategoryMenu = this.activeCategoryMenu ? '' : ' active-dropdown-menu';
      } else {
        this.activeCategoryMenu = '';
      }


      if (this.isAuth) {
        if (e.target === this.avatar.nativeElement || this.avatar.nativeElement.contains(e.target)) {
          this.userMenuIsOpen = !this.userMenuIsOpen;
        } else if (this.userMenuIsOpen) {
          this.userMenuIsOpen = false;
        }
      }
    })
  }

  get icons() { return icons };

  public activeLink(startWith: string | string[]): string {
    if (startWith === '/c/java' && this.router.url.startsWith('/c/javascript')) return '';

    if (typeof startWith == 'string') {
      if (this.router.url.startsWith(startWith)) return ' active';
    } else {
      return startWith.some(s => this.router.url.startsWith(s)) ? ' active' : '';
    }

    return '';
  }
}