import { TestBed } from '@angular/core/testing';
import { CounterStateService } from '@app/services';

export class MockCounterStateService {
  private _count: number = 0;

  set count(value: number) {
    this._count = value;
  }

  get count(): number {
    return this._count;
  }
}

describe('CounterStateService', () => {
  let service: CounterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have count set to 0', () => {
    expect(service.count).toBe(0);
  });

  it('should set count to a given value', () => {
    service.count = 5;
    expect(service.count).toBe(5);
  });

  it('should get count as the set value', () => {
    service.count = 10;
    expect(service.count).toBe(10);
  });
});
