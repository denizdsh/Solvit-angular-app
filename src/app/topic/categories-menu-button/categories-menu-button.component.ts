import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories-menu-button',
  templateUrl: './categories-menu-button.component.html',
  styleUrls: ['./categories-menu-button.component.css']
})
export class CategoriesMenuButtonComponent {
  @Output() showCategoriesMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() isCloseBtn: boolean = false;
}
