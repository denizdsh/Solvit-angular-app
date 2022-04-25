import { Element } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() image: URL | undefined;
  @Input() alt: string = '?'
  @Input() size: string = '2rem';
  @Input() customStyle: string | undefined;
  style!: string;

  imageHasLoaded = false;

  ngOnInit(): void {
    const match: RegExpMatchArray = this.size.match(/[0-9\.]+/)!;
    this.style = `width: ${this.size}; height: ${this.size}; fontSize: ${0.7 * Number(match[0]) + '' + match['input']!.replace(match[0], '')}; `
    if (!this.image) this.style += 'background: rgb(38, 42, 55); ';
    if (this.customStyle) this.style += this.customStyle;
  }

  ngOnChanges(): void {
    this.imageHasLoaded = false;
  }
}
