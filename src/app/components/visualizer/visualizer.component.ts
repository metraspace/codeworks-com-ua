import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GridStateService, IGridItem } from '@app/services';

@Component({
  selector: 'visualizer',
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.scss'
})
export class VisualizerComponent implements OnInit {
  public actualItem: IGridItem;
  public actualCount: number;
  public readonly DEFAULT_COLOR: string = '#fff';

  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
      private readonly _changeDetectorRef: ChangeDetectorRef,
      private readonly _gridStateService: GridStateService
  ) {
  }

  public get color(): string {
    return this.actualItem?.color || this.DEFAULT_COLOR;
  }

  public ngOnInit(): void {
    this._gridStateService.items$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(() => this._updateChanges(this.actualCount));
  }

  public onCountUpdate(count: number): void {
    this.actualCount = count;

    if (this.actualItem && count >= this.actualItem?.from && count <= this.actualItem?.to) {
      return;
    }

    this._updateChanges(count);
  }

  private _updateChanges(actualCount: number): void {
    this.actualItem = this._gridStateService.getItem(actualCount);
    this._changeDetectorRef.markForCheck();
    this._changeDetectorRef.detectChanges();
  }
}
