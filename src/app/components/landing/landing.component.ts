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
    this._stateService.setData(null, null);
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

  search() {
    let page = Math.floor(Math.random() * 10);
    let query = this.query.value['keyword'];
    this._http.query = query;
    let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&orientation=portrait&landscape&order_by=popular&query=${query}`;
    this._http.getImagesWithUrl(url).subscribe(d => {
      if (d['total'] == 0) {
        return this.query = { keyword: new FormControl('Oops.. nothing there')}
      }
      this._stateService.setData(d['results'], d['total_pages']);
      this._stateService.fromLanding(true);
      this._router.navigate(['/images']);
    });
  }
}
