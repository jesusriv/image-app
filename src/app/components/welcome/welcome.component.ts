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
    'Decor', 
    'Los Angeles', 
    'Fitness', 
    'Arts', 
    'New York', 
    'Photography', 
    'Music',
    'Europe'
  ];
  clickedClass: string  = " clicked";
  queries: string[] = [];
  clicked = {};
  constructor(
    private _http: HttpService, 
    private _router: Router, 
    private _localStorage: LocalStorageService) { }

  ngOnInit() {
    document.getElementById('modal').className = 'mobile-menu';
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
    if(this._localStorage.getFromStorage()) {
      this._router.navigate(['/images']);
    }
  }

  select(e: any) {
    if(e.path) {
      if (!this.clicked[e.path[0].childNodes[0].data]) {
        e.path[0].className += this.clickedClass;
        this.clicked[e.path[0].childNodes[0].data] = true;
        this.queries.push(e.path[0].childNodes[0].data);
      } else {
        this.clicked[e.path[0].childNodes[0].data] = false;
        e.path[0].className = 'option';
        this.queries.splice(this.queries.indexOf(e.path[0].childNodes[0].data), 1);
      }
    } else if (e.srcElement){
      if (!this.clicked[e.srcElement.innerText]) {
        e.srcElement.className += this.clickedClass;
        this.clicked[e.srcElement.innerText] = true;
        this.queries.push(e.srcElement.innerText);
      } else {
        this.clicked[e.srcElement.innerText] = false;
        e.srcElement.className = 'option';
        this.queries.splice(this.queries.indexOf(e.srcElement.innerText), 1);
      }
    } else {
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
  }

  send() {
    let page = Math.floor(Math.random() * 100);
    let query = this.queries.join(',').toLocaleLowerCase().toString();
    let url = `https://api.unsplash.com/search/photos?page=${page}&per_page=30&orientation=portrait&landscape&order_by=popular&query=${query}`;
    this._http.getImagesWithUrl(url).subscribe(d => {
      this._localStorage.storeOnLocalStorage(d);
      this._router.navigate(['/images']);
    });
  }

}
