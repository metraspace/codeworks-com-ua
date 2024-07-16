import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponent } from './grid.component';
import { GridStateService, IGridItem } from '@app/services/grid-state/grid-state.service';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let gridStateService: MockGridStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComponent ],
      providers: [
        { provide: GridStateService, useClass: MockGridStateService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    gridStateService = TestBed.inject(GridStateService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return grid items from GridStateService', () => {
    const mockItems: IGridItem[] = [
      { from: 1, to: 5, color: 'red' },
      { from: 6, to: 10, color: 'blue' }
    ];
    spyOnProperty(gridStateService, 'items', 'get').and.returnValue(mockItems);
    expect(component.gridItems).toEqual(mockItems);
  });

  it('should track item by color', () => {
    const item: IGridItem = { from: 1, to: 5, color: 'red' };
    expect(component.trackItemByColor(0, item)).toBe('red');
  });

  it('should call removeItem on GridStateService when deleteGridItem is called', () => {
    const item: IGridItem = { from: 1, to: 5, color: 'red' };
    spyOn(gridStateService, 'removeItem');
    component.deleteGridItem(item);
    expect(gridStateService.removeItem).toHaveBeenCalledWith(item);
  });
});
