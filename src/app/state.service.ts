import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  imageData: any;
  head: boolean = false;
  landing: boolean = false;
  pages: number;

  constructor() { }

  setData(data: any, pages: number) {
    this.imageData = data;
    this.pages = pages;
  }

  provideData() {
    return this.imageData;
  }

  header() {
    this.head != this.head;
    return this.head;
  }

  fromLanding(bool):void {
    this.landing = bool;
  }
}
