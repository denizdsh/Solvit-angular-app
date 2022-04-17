import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  animations: [
    trigger('userMenu', [
      state('open', style({
        top: '120px',
        right: '100px',
        opacity: '100%',
        fontSize: '1rem'
      })),
      state('closed', style({
        top: '0px',
        right: '0px',
        left: '99%',
        opacity: '0%',
        fontSize: '0px'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ])
    ])
  ]
})
export class UserMenuComponent {
  @Input() userMenuIsOpen: boolean = false;
}
