import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorViewComponent } from '@app/components';
import { By } from '@angular/platform-browser';

describe('ColorViewComponent', () => {
  let component: ColorViewComponent;
  let fixture: ComponentFixture<ColorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorViewComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default color when no input color is provided', () => {
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('.color-view')).nativeElement;
    expect(divElement.style.backgroundColor).toBe('rgb(255, 255, 255)'); // '#fff' is 'rgb(255, 255, 255)'
  });

  it('should use input color when provided', () => {
    component.color = '#000';
    fixture.detectChanges();
    const divElement = fixture.debugElement.query(By.css('.color-view')).nativeElement;
    expect(divElement.style.backgroundColor).toBe('rgb(0, 0, 0)'); // '#000' is 'rgb(0, 0, 0)'
  });

  it('should return default color when input color is undefined', () => {
    component.color = undefined;
    expect(component.actualColor).toBe('#fff');
  });

  it('should return input color when it is provided', () => {
    component.color = '#123456';
    expect(component.actualColor).toBe('#123456');
  });
});
