import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from 'src/app/shared/util';
import { icons } from 'src/app/shared/util';

@Component({
  selector: 'app-sort-aside',
  templateUrl: './sort-aside.component.html',
  styleUrls: ['./sort-aside.component.css']
})
export class SortAsideComponent {
  sortBy: query['sortBy'];
  order: query['order'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    let queryParams = this.router.routerState.snapshot.root.queryParams;
    this.sortBy = queryParams['sortBy'] || 'date';
    this.order = queryParams['order'] || 'asc'
  }

  get icons() { return icons; }

  changeParamsHandler(sortBy: query['sortBy'], order: query['order']): void {
    this.sortBy = sortBy;
    this.order = order;

    let url: string[] = this.router.routerState.snapshot.url.split('?');
    url.pop();

    this.router.navigate(url, { queryParams: { sortBy: this.sortBy, order: this.order } })
  }

  activeParam(param: query['sortBy'] | query['order']): string {
    if (this.sortBy === param || this.order === param)
      return ' active-param';

    return ''
  }
}
