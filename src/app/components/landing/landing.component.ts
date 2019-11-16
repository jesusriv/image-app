import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { StateService } from '../../state.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
  query: any;

  constructor(
    private _http: HttpService, 
    private _stateService: StateService, 
    private _router: Router) { }

  ngOnInit() {
    this._stateService.setData(null);
    document.getElementById('modal').className = 'mobile-menu';
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
    
    this.query = new FormGroup({
      keyword: new FormControl('')
    });
    this._stateService.header();
  }

  ngOnDestroy() {
    this._stateService.header();
  }

  async search() {
    let page = Math.floor(Math.random() * 10);
    let query = this.query.value['keyword'];
    let location = "search"
    this._http.query = query;
    let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&orientation=portrait&landscape&order_by=popular&query=${query}`;
    
    let response = await this._http.getImagesWithUrl(url).toPromise();
    response['total'] == 0 ? this.query = { keyword: new FormControl('Oops.. nothing there')}: null;

    let images = response['results'];

    let fetch = await this.fetchMoreImages(query);
    images = images.concat(fetch['results']);
    this._stateService.setData(images);
    this._router.navigate(['/images/' + location]);
  }

  async fetchMoreImages(query: string): Promise<Object> {
    let page = Math.floor(Math.random() * this._stateService.getPages());
    let data = await this._http.getImagesWithPageNumber(page, query).toPromise();
    return data;
  }
}
