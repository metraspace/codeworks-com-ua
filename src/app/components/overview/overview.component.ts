import { Component } from '@angular/core';
import { GridStateService } from '@app/services';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  public addNewGridItemFormVisible: boolean = false;

  constructor(
    private readonly _gridStateService: GridStateService
  ) {
  }

  public get isGridItemsLimit(): boolean {
    return this._gridStateService.isGridItemsLimit;
  }

  public get isAddNewGridItemFormAvailable(): boolean {
    return !this.isGridItemsLimit && this.addNewGridItemFormVisible;
  }

  public toggleAddGridItemFormVisibility(): void {
    this.addNewGridItemFormVisible = !this.addNewGridItemFormVisible;
  }

  public addNewGridItem(): void {
    if (this._gridStateService.isGridItemsLimit) {
      return;
    }

    this.toggleAddGridItemFormVisibility();
  }
}
