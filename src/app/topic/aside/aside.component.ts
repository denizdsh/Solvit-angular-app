import { Component, EventEmitter, Input, Output } from '@angular/core';
import { topicType } from 'src/app/shared/util';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Output() showCategoriesMenu: EventEmitter<boolean> = new EventEmitter();
  @Input() type!: topicType;
  @Input() showSortAside!: boolean;
  @Input() isCloseBtn!: boolean;
}
