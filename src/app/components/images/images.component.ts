import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router'
import { HttpService } from '../../http.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: any;
  oneImage: string;
  pages: number;
  

  constructor(
    private _router: Router, 
    private _stateService: StateService,
    private _localStorage: LocalStorageService,
    private _http: HttpService) { }

  ngOnInit() {
    document.getElementById('modal').className = 'mobile-menu';
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
    
    if (!this._stateService.landing) {
      if(!this._localStorage.getFromStorage()) {
        this._router.navigate(['/welcome']);
      } else {
        this.getImages();
        this.getPages();
        if (!this._localStorage.returnAppended()) {
          this.fetchMoreImages()
          this._localStorage.appended(true);
        }
      }
    } else {
      this.pages = this._stateService.pages;
      this.images = this._stateService.provideData();
      this.fetchMoreImages();
      this.images = this.shuffle(this.images);
    }
  }
  
  ngOnDestroy() {
    if(this._stateService.landing) {
      this._stateService.fromLanding(false);
    }
  }
  
  getImages():void {
    this.images = this._localStorage.getFromStorage();
    this.images = this.shuffle(this.images);
  }

  getPages():void {
    this.pages = this._localStorage.returnPages();
  }
  
  fetchMoreImages():void {
    let page = Math.floor(Math.random() * this.pages);
    this._http.getImagesWithPageNumber(page)
      .toPromise()
      .then(d => {
        this.images = this.images.concat(d['results']);
      })
      .then(() => {
        let page = Math.floor(Math.random() * this.pages);
        this._http.getImagesWithPageNumber(page)
          .toPromise()
          .then(d => {
            this.images = this.images.concat(d['results']);
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }

  viewImage(e: any):void {
    document.body.setAttribute('class', 'hidden  relative');
    document.body.parentElement.setAttribute('class', 'hidden');
    document.body.setAttribute('class', 'relative');
    this.oneImage = e.originalTarget.src;
  }

  close():void {
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
    this.oneImage = null;
  }

  shuffle(a: Object[]):object[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

}
