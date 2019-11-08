import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  pageNum: number = 0;
  query: string;
  url: string = `https://api.unsplash.com/search/photos?page=${this.pageNum}&per_page=30&orientation=portrait&landscape&order_by=popular&query=`;
  headers: Object = {
    headers: {
    "Authorization": "Client-ID 0050c8dd5d5c6700d604024d74f5533cdaa9f1412cbdcdfa9e1997b7169421cb"
    } 
  };

  constructor(private _http: HttpClient) { }

  public getImagesWithQuery(query: string, page: number) {
    this.query = query;
    this.pageNum = page;
    this.url += query;
    return this._http.get(this.url, this.headers);
  }

  public getRandomImages() {
    return this._http.get(`https://api.unsplash.com/collections?&per_page=30`, this.headers)
  }

  public getImagesWithPageNumber(page) {
    let url: string = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&orientation=portrait&landscape&order_by=popular&query=${this.query}`;
    return this._http.get(url, this.headers);
  }

  public getRelatedCollections(id) {
    return this._http.get(`https://api.unsplash.com/photos/random?count=30`, this.headers)
  }
}
