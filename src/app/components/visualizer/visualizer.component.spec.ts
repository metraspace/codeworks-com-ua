import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ColorViewComponent, TimerComponent, VisualizerComponent } from '@app/components';
import { CounterStateService } from '@app/services';
import { GridStateService } from '@app/services';
import { MockCounterStateService } from '@app/services/counter-state/counter-state.service.spec';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';

describe('VisualizerComponent', () => {
  let component: VisualizerComponent;
  let fixture: ComponentFixture<VisualizerComponent>;
  let mockCounterStateService: MockCounterStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizerComponent, TimerComponent, ColorViewComponent],
      providers: [
        { provide: CounterStateService, useClass: MockCounterStateService },
        { provide: GridStateService, useClass: MockGridStateService },
        ChangeDetectorRef
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponent);
    component = fixture.componentInstance;
    mockCounterStateService = TestBed.inject(CounterStateService) as unknown as MockCounterStateService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return default color when actualColor is undefined', () => {
    expect(component.color).toBe(component.DEFAULT_COLOR);
  });

  it('should return actualColor when it is defined', () => {
    component.actualColor = '#123456';
    expect(component.color).toBe('#123456');
  });

  it('should update count and change color based on grid items', () => {
    component.onCountUpdate(5);
    expect(mockCounterStateService.count).toBe(5);
    expect(component.actualColor).toBe('#ff0000');
  });

  it('should not change color if the new color is the same as the current color', () => {
    component.actualColor = '#ff0000';
    component.onCountUpdate(5);
    expect(component.actualColor).toBe('#ff0000');
  });
});
