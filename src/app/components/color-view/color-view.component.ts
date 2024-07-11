import { Component, Input } from '@angular/core';

const DEFAULT_COLOR: string = '#fff';

@Component({
  selector: 'color-view',
  template: `<div [style.background-color]="actualColor" class="color-view"></div>`,
  styles: [`
    .color-view {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ColorViewComponent {
  @Input()
  public color: string;

  public get actualColor(): string {
    return this.color || DEFAULT_COLOR;
  }
}
