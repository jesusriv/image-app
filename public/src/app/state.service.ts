import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  imageData: any;
  explore: boolean = false;
  head: boolean = false;

  constructor() { }

  getData(data: any) {
    this.imageData = data;
  }

  provideData() {
    return this.imageData;
  }

  fromExplore(bool):void {
    this.explore = bool;
  }

  header() {
    this.head != this.head;
    return this.head;
  }
}
