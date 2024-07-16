import { TestBed } from '@angular/core/testing';
import { GridStateService, IGridItem } from '@app/services';
import { BehaviorSubject, Observable } from 'rxjs';

export class MockGridStateService {
  private readonly _itemsSubject$: BehaviorSubject<IGridItem[]> = new BehaviorSubject([]);
  private _itemsMap: Map<number, IGridItem> = new Map<number, IGridItem>();

  public get items$(): Observable<IGridItem[]> {
    return this._itemsSubject$.asObservable();
  }

  public get items(): IGridItem[] {
    return this._itemsSubject$.getValue();
  }

  public get isGridItemsLimit(): boolean {
    return this.items.length >= 10;
  }

  public getItem(count: number): IGridItem {
    return this._itemsMap.get(count);
  }

  public addItem(gridItem: IGridItem): void {
    const currentItems = this._itemsSubject$.getValue();
    this._itemsSubject$.next([...currentItems, gridItem]);
    this._setMapItem(gridItem);
  }

  public removeItem(gridItem: IGridItem): void {
    const items = this._itemsSubject$.getValue().filter(item => item.color !== gridItem.color);
    this._itemsSubject$.next(items);
    this._removeMapItem(gridItem);
  }

  private _setMapItem(item: IGridItem): void {
    for (let i = item.from; i <= item.to; i++) {
      this._itemsMap.set(i, item);
    }
  }

  private _removeMapItem(item: IGridItem): void {
    for (let i = item.from; i <= item.to; i++) {
      this._itemsMap.delete(i);
    }
  }
}

describe('GridStateService', () => {
  let service: GridStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty items list', () => {
    expect(service.items.length).toBe(0);
  });

  it('should add an item', () => {
    const gridItem: IGridItem = { from: 1, to: 5, color: 'red' };
    service.addItem(gridItem);

    expect(service.items.length).toBe(1);
    expect(service.items[0]).toEqual(gridItem);
    expect(service.getItem(3)).toEqual(gridItem);
  });

  it('should remove an item', () => {
    const gridItem1: IGridItem = { from: 1, to: 5, color: 'red' };
    const gridItem2: IGridItem = { from: 6, to: 10, color: 'blue' };
    service.addItem(gridItem1);
    service.addItem(gridItem2);

    service.removeItem(gridItem1);

    expect(service.items.length).toBe(1);
    expect(service.items[0]).toEqual(gridItem2);
    expect(service.getItem(3)).toBeUndefined();
  });

  it('should return undefined for a non-existing item', () => {
    const result = service.getItem(100);
    expect(result).toBeUndefined();
  });

  it('should limit items to 10', () => {
    for (let i = 0; i < 10; i++) {
      service.addItem({ from: i * 10, to: i * 10 + 9, color: `color${i}` });
    }

    expect(service.isGridItemsLimit).toBeTrue();
  });

  it('should not limit items if less than 10', () => {
    for (let i = 0; i < 9; i++) {
      service.addItem({ from: i * 10, to: i * 10 + 9, color: `color${i}` });
    }

    expect(service.isGridItemsLimit).toBeFalse();
  });
});
