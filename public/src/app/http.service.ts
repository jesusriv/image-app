import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  pageNum: number = 0;
  url: string = `https://api.unsplash.com/search/photos?page=${this.pageNum}&per_page=30&orientation=portrait&order_by=popular&query=`;
  headers: Object = {
    headers: {
    "Authorization": "Client-ID 0050c8dd5d5c6700d604024d74f5533cdaa9f1412cbdcdfa9e1997b7169421cb"
    } 
  };

  constructor(private _http: HttpClient) { }

  getImagesWithQuery(query: string, page: number) {
    this.pageNum = page;
    this.url += query;
    return this._http.get(this.url, this.headers);
  }
}
