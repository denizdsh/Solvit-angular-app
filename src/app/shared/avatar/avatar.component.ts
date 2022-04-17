import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() image: string = '';
  @Input() alt: string = '?'
  @Input() size: string = '2rem';
  style!: string;

  ngOnInit(): void {
    const match: RegExpMatchArray = this.size.match(/[0-9\.]+/)!;

    this.style = `width: ${this.size}; height: ${this.size}; fontSize: ${0.7 * Number(match[0]) + '' + match['input']!.replace(match[0], '')};`
    if (!this.image) this.style += ' background: #323D57;';
  }
}
