import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { StateService } from '../../state.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  query: object;

  constructor(private _http: HttpService, private _stateService: StateService, private _router: Router) { }

  ngOnInit() {
    this.query = { keyword: ''}
  }

  search() {
    let page = Math.floor(Math.random() * 100);
    this._http.getImagesWithQuery(this.query['keyword'].toLowerCase(), page).subscribe(d => {
      if (d['total'] == 0) {
        return this.query = { keyword: 'Oops.. nothing there'}
      }
      const newArr = this.shuffle(d['results']);
      this._stateService.getData(newArr);
      this._router.navigate(['/images']);
    });
  }

  shuffle(a: Object[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

}
