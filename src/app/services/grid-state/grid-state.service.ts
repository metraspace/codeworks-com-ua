import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IGridItem {
  from: number;
  to: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class GridStateService {
  public addedColorsMap: Map<string, string> = new Map<string, string>;
  private readonly _itemsSubject$: BehaviorSubject<IGridItem []> = new BehaviorSubject([]);
  private _itemsMap: Map<number, IGridItem> = new Map<number, IGridItem>();

  public get items$(): Observable<IGridItem []> {
    return this._itemsSubject$.asObservable();
  }

  public get items(): IGridItem [] {
    return this._itemsSubject$.getValue();
  }

  public get isGridItemsLimit(): boolean {
    return this.items.length >= 10;
  }

  public getItem(count: number): IGridItem {
    return this._itemsMap.get(count);
  }

  public addItem(gridItem: IGridItem): void {
    this._itemsSubject$.next([
      ...this._itemsSubject$.getValue(),
      gridItem
    ]);
    this.addedColorsMap.set(gridItem.color, gridItem.color);

    this._setMapItem(gridItem);
  }

  public removeItem(gridItem: IGridItem): void {
    // Color is uniq property, use it for identify
    const items: IGridItem [] = [...this._itemsSubject$.getValue()].filter(
        (item: IGridItem) => item.color !== gridItem.color
    );

    this.addedColorsMap.delete(gridItem.color);
    this._removeMapItem(gridItem);
    this._itemsSubject$.next(items);
  }

  public checkColor(color: string): boolean {
    return !!this.addedColorsMap.get(color);
  }

  private _setMapItem(item: IGridItem): void {
    for (let i: number = item.from; i <= item.to; i++) {
      this._itemsMap.set(i, item);
    }
  }

  private _removeMapItem(item: IGridItem): void {
    for (let i: number = item.from; i <= item.to; i++) {
      this._itemsMap.delete(i);
    }
  }
}
