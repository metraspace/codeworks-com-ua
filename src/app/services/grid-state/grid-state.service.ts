import { Injectable } from '@angular/core';

export interface IGridItem {
  from: number;
  to: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class GridStateService {
  public items: IGridItem [] = [];

  public get isGridItemsLimit(): boolean {
    return this.items.length >= 10;
  }

  public addItem(gridItem: IGridItem): void {
    this.items = [...this.items, gridItem];
  }

  public removeItem(gridItem: IGridItem): void {
    // Color is uniq property, use it for identify
    this.items = this.items.filter((item: IGridItem) => item.color !== gridItem.color);
  }
}
