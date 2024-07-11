import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from '@app/components';
import { GridStateService } from '@app/services';
import { ColorViewComponent, GridComponent, TimerComponent, VisualizerComponent } from '@app/components';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let gridStateServiceMock = MockGridStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        OverviewComponent,
        VisualizerComponent,
        GridComponent,
        TimerComponent,
        ColorViewComponent,
      ],
      providers: [
        { provide: GridStateService, useValue: MockGridStateService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with addNewGridItemFormVisible set to false', () => {
    expect(component.addNewGridItemFormVisible).toBeFalsy();
  });

  it('should toggle addNewGridItemFormVisibility', () => {
    component.toggleAddGridItemFormVisibility();
    expect(component.addNewGridItemFormVisible).toBeTruthy();

    component.toggleAddGridItemFormVisibility();
    expect(component.addNewGridItemFormVisible).toBeFalsy();
  });

  it('should not call toggleAddGridItemFormVisibility when grid items limit is reached', () => {
    (gridStateServiceMock as any).isGridItemsLimit = true;

    const toggleSpy = spyOn(component, 'toggleAddGridItemFormVisibility');

    component.addNewGridItem();

    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('should call toggleAddGridItemFormVisibility when grid items limit is not reached', () => {
    (gridStateServiceMock as any).isGridItemsLimit = false;

    const toggleSpy = spyOn(component, 'toggleAddGridItemFormVisibility').and.callThrough();

    component.addNewGridItem();

    expect(toggleSpy).toHaveBeenCalled();
  });
});
