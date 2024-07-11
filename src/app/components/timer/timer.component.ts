import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { filter, Subscription, take, timer } from 'rxjs';

const TIMER_INTERVAL: number = 1000; // ms
const TIMER_COUNT_STEP: number = 1;

@Component({
  selector: 'timer',
  template: `<div #timerRef></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  public from: number;
  @Input()
  public to: number;
  @Output()
  public countUpdateEvent: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('timerRef', {static: true})
  private readonly _timerRef: ElementRef;

  private _count: number = 0;
  private _timeUpdateSubscription: Subscription;

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _renderer: Renderer2
  ) {
  }

  public ngOnInit(): void {
    this._startTimer();
  }

  public ngOnDestroy(): void {
    this._removeTimeUpdateSubscription();
  }

  public set count(value: number) {
    this._count = value;
  }

  public get count(): number {
    return this._count;
  }

  private _startTimer(): void {
    // Use ngZone to optimize
    this._ngZone.runOutsideAngular(() => this._run());
  }

  private _run(): void {
    const lastCount: number = this.to + TIMER_COUNT_STEP;

    this._timeUpdateSubscription = timer(this.from, TIMER_INTERVAL)
      .pipe(
        take(lastCount),
        filter(() => {
          const isLimit: boolean = this.count >= this.to;

          if (isLimit) {
            this._resetTimer();
            this._startTimer();
          }

          return !isLimit;
        })
      )
      .subscribe(() => {
          this._increment();
          this._updateTimeView(this.count);
          this.countUpdateEvent.emit(this.count);
        }
      );
  }

  private _updateTimeView(count: number): void {
    this._renderer.setProperty(this._timerRef.nativeElement, 'innerHTML', count);
  }

  private _increment(): void {
    this.count = ++this.count;
  }

  private _resetTimer(): void {
    this.count = this.from;
    this._updateTimeView(this.count);
    this._removeTimeUpdateSubscription();
  }

  private _removeTimeUpdateSubscription(): void {
    if (this._timeUpdateSubscription) {
      this._timeUpdateSubscription.unsubscribe();
      this._timeUpdateSubscription = null;
    }
  }
}
