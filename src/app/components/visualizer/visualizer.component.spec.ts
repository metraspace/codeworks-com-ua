import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ColorViewComponent, TimerComponent, VisualizerComponent } from '@app/components';
import { IGridItem } from '@app/services';
import { GridStateService } from '@app/services';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';
import { first } from 'rxjs';

describe('VisualizerComponent', () => {
  let component: VisualizerComponent;
  let fixture: ComponentFixture<VisualizerComponent>;
  let gridStateService: MockGridStateService;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizerComponent, TimerComponent, ColorViewComponent],
      providers: [
        { provide: GridStateService, useClass: MockGridStateService },
        ChangeDetectorRef
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponent);
    gridStateService  = TestBed.inject(GridStateService) as any;
    changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call ngOnInit method', () => {
    const spy = spyOn(component, 'ngOnInit');

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('Should subscribe on _gridStateService.items$', () => {
    const spy = spyOn(component, 'ngOnInit');

    component.ngOnInit();

    (component as any)._gridStateService.items$
        .pipe(first())
        .subscribe((countries: Array<IGridItem []>) => {
          expect(countries).toEqual([]);
        });
  });

  it('should return default color when actualColor is undefined', () => {
    expect(component.color).toBe(component.DEFAULT_COLOR);
  });

  it('should update actualCount', () => {
    const count = 5;
    component.onCountUpdate(count);
    expect(component.actualCount).toBe(count);
  });

  it('should not call _updateChanges if count is within actualItem range', () => {
    const count = 5;
    component.actualItem = { from: 1, to: 10, color: 'red' };

    spyOn(component as any, '_updateChanges');

    component.onCountUpdate(count);
    expect((component as any)._updateChanges).not.toHaveBeenCalled();
  });

  it('should call _updateChanges if count is outside actualItem range', () => {
    const count = 15;
    component.actualItem = { from: 1, to: 10, color: 'red' };

    spyOn(component as any, '_updateChanges');

    component.onCountUpdate(count);
    expect((component as any)._updateChanges).toHaveBeenCalledWith(count);
  });

  it('should call _updateChanges if actualItem is undefined', () => {
    const count = 5;
    component.actualItem = undefined;

    spyOn(component as any, '_updateChanges');

    component.onCountUpdate(count);
    expect((component as any)._updateChanges).toHaveBeenCalledWith(count);
  });
});
