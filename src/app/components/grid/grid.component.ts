import { Component } from '@angular/core';
import { GridStateService, IGridItem } from '@app/services/grid-state/grid-state.service';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  constructor(
    private readonly _gridStateService: GridStateService,
  ) {
  }

  public get gridItems(): IGridItem [] {
    return this._gridStateService.items;
  }

  public trackItemByColor(index: number, item: IGridItem): string {
    return item.color;
  }

  public deleteGridItem(item: IGridItem): void {
    this._gridStateService.removeItem(item);
  }
}
