import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;

  constructor() { }

  // busy() {
  //   this.busyRequestCount++;
  //   this.spinnerService.show(undefined, {
  //     type: 'timer',
  //     bdColor: 'rgba(255,255,255,0.7)',
  //     color: '#333333'
  //   });
  // }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      // this.spinnerService.hide();
    }
  }
}