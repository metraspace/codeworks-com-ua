import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridStateService, IGridItem } from '@app/services/grid-state/grid-state.service';
import { GridComponent } from '@app/components';
import { ColorViewComponent } from '@app/components';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let mockGridStateService: MockGridStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent, ColorViewComponent],
      providers: [
        { provide: GridStateService, useClass: MockGridStateService }
      ]
    })
      .compileComponents();

    mockGridStateService = TestBed.inject(GridStateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return grid items from the service', () => {
    const items: IGridItem [] = component.gridItems;
    expect(items.length).toBe(3);
    expect(items[0].color).toBe('#ff0000');
    expect(items[1].color).toBe('#00ff00');
    expect(items[2].color).toBe('#0000ff');
  });

  it('should track item by color', () => {
    const item: IGridItem = { color: '#ff0000', from: 0, to: 10 };
    const trackByResult = component.trackItemByColor(0, item);
    expect(trackByResult).toBe('#ff0000');
  });

  it('should delete a grid item', () => {
    const item = mockGridStateService.items[0];
    component.deleteGridItem(item);
    expect(mockGridStateService.items.length).toBe(2);
  });
});
