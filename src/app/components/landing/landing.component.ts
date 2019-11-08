import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { StateService } from '../../state.service';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  query: object;

  constructor(
    private _http: HttpService, 
    private _stateService: StateService, 
    private _router: Router,
    private _localStorage: LocalStorageService,) { }

  ngOnInit() {
    this.query = { keyword: ''}
    this._stateService.header();
  }

  search() {
    let page = Math.floor(Math.random() * 10);
    this._http.getImagesWithQuery(this.query['keyword'].toLowerCase(), page).subscribe(d => {
      if (d['total'] == 0) {
        return this.query = { keyword: 'Oops.. nothing there'}
      }
      this._stateService.setData(d['results'], d['total_pages']);
      this._stateService.header();
      this._stateService.fromLanding(true);
      this._router.navigate(['/images']);
    });
  }
}
