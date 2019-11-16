import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  imageData: any;
  head: boolean = false;
  pages: number;

  constructor() { }

  setData(data: Object[]) {
    this.imageData = data;
  }

  setPages(pages: number) {
    this.pages = pages;
  }

  provideData() {
    return this.imageData;
  }

  getPages() {
    return this.pages;
  }

  header() {
    this.head != this.head;
    return this.head;
  }
}
