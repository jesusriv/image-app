import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  options: string[] = [
    'Home', 
    'Fashion', 
    'Make Up', 
    'Gym', 
    'New York', 
    'Technology', 
    'Halloween',
    'Outdoors'
  ];
  clickedClass: string  = " clicked";
  queries: string[] = [];
  clicked = {};
  constructor(
    private _http: HttpService, 
    private _router: Router, 
    private _localStorage: LocalStorageService) { }

  ngOnInit() {
    if(this._localStorage.getFromStorage()) {
      this._router.navigate(['/images']);
    }
  }

  select(e: any) {
    if (!this.clicked[e.originalTarget.firstChild.nodeValue]) {
      e.originalTarget.className += this.clickedClass;
      this.clicked[e.originalTarget.firstChild.nodeValue] = true;
      this.queries.push(e.originalTarget.firstChild.nodeValue);
    } else {
      this.clicked[e.originalTarget.firstChild.nodeValue] = false;
      e.originalTarget.className = 'option';
      this.queries.splice(this.queries.indexOf(e.originalTarget.firstChild.nodeValue), 1);
    }
  }

  send() {
    let page = Math.floor(Math.random() * 100);
    this._http.getImagesWithQuery(this.queries.join(',').toLowerCase(), page).subscribe(d => {
      this._localStorage.storeOnLocalStorage(d);
      this._router.navigate(['/images']);
    });
  }

}