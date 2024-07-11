import { TestBed } from '@angular/core/testing';
import { GridStateService, IGridItem } from '@app/services';

export class MockGridStateService {
  public items: IGridItem [] = [
    { color: '#ff0000', from: 0, to: 10 },
    { color: '#00ff00', from: 11, to: 20 },
    { color: '#0000ff', from: 21, to: 30 }
  ];

  public addItem(item: IGridItem): void {

  }

  public removeItem(item: IGridItem): void {
    this.items = this.items.filter(i => i !== item);
  }

  public get isGridItemsLimit(): boolean {
    return false;
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

  it('should add a new item', () => {
    const newItem: IGridItem = { color: '#ff0000', from: 0, to: 10 };
    service.addItem(newItem);
    expect(service.items.length).toBe(1);
    expect(service.items[0]).toEqual(newItem);
  });

  it('should remove an item by color', () => {
    const item1: IGridItem = { color: '#ff0000', from: 0, to: 10 };
    const item2: IGridItem = { color: '#00ff00', from: 11, to: 20 };
    service.addItem(item1);
    service.addItem(item2);
    service.removeItem(item1);
    expect(service.items.length).toBe(1);
    expect(service.items[0]).toEqual(item2);
  });

  it('should not remove an item if color does not match', () => {
    const item1: IGridItem = { color: '#ff0000', from: 0, to: 10 };
    const item2: IGridItem = { color: '#00ff00', from: 11, to: 20 };
    service.addItem(item1);
    service.addItem(item2);
    service.removeItem({ color: '#0000ff', from: 21, to: 30 });
    expect(service.items.length).toBe(2);
    expect(service.items).toContain(item1);
    expect(service.items).toContain(item2);
  });
});
