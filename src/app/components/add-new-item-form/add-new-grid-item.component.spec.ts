import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewGridItemComponent } from '@app/components';
import { GridStateService, IGridItem } from '@app/services';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';

describe('AddNewGridItemComponent', () => {
  let component: AddNewGridItemComponent;
  let fixture: ComponentFixture<AddNewGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewGridItemComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: GridStateService, useClass: MockGridStateService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['color'].value).toBe(component.DEFAULT_COLOR);
    expect(component.form.controls['from'].value).toBeNull();
    expect(component.form.controls['to'].value).toBeNull();
  });

  it('should validate the form fields correctly', () => {
    component.ngOnInit();

    let colorControl = component.form.controls['color'];
    let fromControl = component.form.controls['from'];
    let toControl = component.form.controls['to'];

    // Initial state
    expect(colorControl.valid).toBeTruthy();
    expect(fromControl.valid).toBeFalsy();
    expect(toControl.valid).toBeFalsy();

    // Valid values
    fromControl.setValue(10);
    toControl.setValue(20);
    expect(fromControl.valid).toBeTruthy();
    expect(toControl.valid).toBeTruthy();

    // Invalid values
    fromControl.setValue(-1);
    toControl.setValue(60);
    expect(fromControl.valid).toBeFalsy();
    expect(toControl.valid).toBeFalsy();
  });

  it('should mark form as invalid when "from" is greater than "to"', () => {
    component.form.patchValue({ from: 20, to: 10 });

    expect(component.isFormValid).toBeFalsy();
  });

  it('should mark form as invalid when "from" is equal to "to"', () => {
    component.form.patchValue({ from: 10, to: 10 });

    expect(component.isFormValid).toBeFalsy();
  });

  it('should mark form as valid when all conditions are met', () => {
    component.form.patchValue({ from: 10, to: 20 });

    expect(component.isFormValid).toBeTruthy();
  });
});
