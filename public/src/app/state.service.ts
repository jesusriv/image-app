import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  imageData: any;
  constructor() { }

  getData(data: any) {
    this.imageData = data;
  }

  provideData() {
    return this.imageData;
  }
}
