import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GridStateService } from '@app/services';

@Component({
  selector: 'add-new-item-form',
  templateUrl: './add-new-grid-item.component.html',
  styleUrl: './add-new-grid-item.component.scss'
})
export class AddNewGridItemComponent implements OnInit {
  @Output()
  public gridItemCreatedEvent: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public readonly MIN_TIMER_VALUE: number = 0;
  public readonly MAX_TIMER_VALUE: number = 59;
  public readonly DEFAULT_COLOR: string = '#000';
  public isColorUsed: boolean = false;
  public isCountOverlap: boolean = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _gridStateService: GridStateService
  ) {
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public get isFormValid(): boolean {
    return this.form.valid && this.isStartValueLessThanEnd && this.isEndValueMoreThanStart && !this.isCountsEqual;
  }

  public get isStartValueLessThanEnd(): boolean {
    const {from, to} = this.form.getRawValue();

    if (!from || !to) {
      return true;
    }

    return from < to;
  }

  public get isEndValueMoreThanStart(): boolean {
    const {from, to} = this.form.getRawValue();

    if (!from || !to) {
      return true;
    }

    return to > from;
  }

  public get isCountsEqual(): boolean {
    const {from, to} = this.form.getRawValue();

    if (!from || !to) {
      return false;
    }

    return from === to;
  }

  public getFormError(property: string, validator: string) {
    return this.form.controls[property]?.['errors']?.[validator];
  }

  public addItem(): void {
    if (this._isColorAlreadyUsed()) {
      this.isColorUsed = true;

      return;
    }

    if (this.isCountsOverlap()) {
      this.isCountOverlap = true;

      return;
    }

    if (!this.form.valid) {
      return;
    }

    this._gridStateService.addItem(this.form.getRawValue());
    this.gridItemCreatedEvent.emit();
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
        color: new FormControl(this.DEFAULT_COLOR, [Validators.required]),
        from: new FormControl(
          null,
          [
            Validators.required,
            Validators.min(this.MIN_TIMER_VALUE),
            Validators.max(this.MAX_TIMER_VALUE)
          ],
        ),
        to: new FormControl(null, [
            Validators.required,
            Validators.min(this.MIN_TIMER_VALUE),
            Validators.max(this.MAX_TIMER_VALUE)
          ]
        )
      }
    );
  }

  private isCountsOverlap(): boolean {
    const {from, to} = this.form.getRawValue();

    return !!this._gridStateService.getItem(from) || !!this._gridStateService.getItem(to);
  }

  private _isColorAlreadyUsed(): boolean {
    const color = this.form.get('color').value;

    return this._gridStateService.checkColor(color);
  }
}
