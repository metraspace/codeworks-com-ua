import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterStateService {
  private _count: number = 0;

  public set count(value: number) {
    this._count = value;
  }

  public get count(): number {
    return this._count;
  }
}
