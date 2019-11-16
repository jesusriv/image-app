import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  query: string;
  pageNum: number = 0;
  headers: Object = {
    headers: {
    "Authorization": "Client-ID 0050c8dd5d5c6700d604024d74f5533cdaa9f1412cbdcdfa9e1997b7169421cb"
    } 
  };

  constructor(private _http: HttpClient) { }

  public getImagesWithUrl(url: string) {
    return this._http.get(url, this.headers);
  }

  public getRandomImages() {
    return this._http.get(`https://api.unsplash.com/collections?&per_page=30`, this.headers)
  }

  public getImagesWithPageNumber(page: number, query: string) {
    let url: string = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&orientation=portrait&landscape&order_by=popular&query=${query}`;
    return this._http.get(url, this.headers);
  }

  public getRelatedCollections(id) {
    return this._http.get(`https://api.unsplash.com/photos/random?count=30`, this.headers)
  }
}
