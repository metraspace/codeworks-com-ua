import { ChangeDetectorRef, Component } from '@angular/core';
import { GridStateService, CounterStateService, IGridItem } from '@app/services';

@Component({
  selector: 'visualizer',
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent {
  public actualColor: string;
  public readonly DEFAULT_COLOR: string = '#fff';

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _counterStateService: CounterStateService,
    private readonly _gridStateService: GridStateService
  ) {
  }

  public get color(): string {
    return this.actualColor || this.DEFAULT_COLOR;
  }

  public onCountUpdate(count: number): void {
    this._counterStateService.count = count;
    const actualCount: number = count;
    const newColor: string = this._gridStateService.items.find(
      (gridItem: IGridItem) => actualCount >= gridItem.from && actualCount <= gridItem.to
    )?.color;

    if (this.actualColor !== newColor) {
      this.actualColor = newColor;
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    }
  }
}
