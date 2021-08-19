import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  busyRequestCount = 0;

  constructor() { }

  busy() {
    this.busyRequestCount++;
    this.isLoading.next(true);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isLoading.next(false);
    }
  }

}