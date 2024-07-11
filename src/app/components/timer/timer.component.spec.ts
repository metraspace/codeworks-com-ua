import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { TimerComponent } from '@app/components';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      providers: [
        Renderer2
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the timer on ngOnInit', fakeAsync(() => {
    component.from = 0;
    component.to = 5;

    component.ngOnInit();
    tick();
    expect(component.count).toBe(1);
    component.ngOnDestroy();
  }));

  it('should update the DOM with the current count', fakeAsync(() => {
    component.from = 0;
    component.to = 1;
    component.ngOnInit();
    tick();
    const timerElement = fixture.nativeElement.querySelector('div');

    tick(1000)
    fixture.detectChanges();
    expect(timerElement.innerHTML).toBe('1');
    component.ngOnDestroy();
  }));
});
