import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { HttpService } from '../../http.service';
import { StateService } from '../../state.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: Array<Object>;
  oneImage: string;
  pages: number;
  location: string;
  

  constructor(
    private _router: Router, 
    private _route: ActivatedRoute,
    private _stateService: StateService,
    private _localStorage: LocalStorageService,
    private _http: HttpService) { }

  ngOnInit() {
    this._route.params
      .subscribe((params: Params) => {
        this.location = params.location;
      });
    if (this.location != 'search') {
      if(!this._localStorage.getFromStorage()) {
        this._router.navigate(['/welcome']);
      } else {
        this.getImages();
        this.getPages();
      }
    } else {
      this.pages = this._stateService.pages;
      this.images = [];
      this.images = this._stateService.provideData();
      this.images = this.shuffle(this.images);
    }
  }
  
  ngOnDestroy() {
    document.getElementById('modal').className = 'mobile-menu';
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
  }
  
  getImages():void {
    this.images = this._localStorage.getFromStorage();
    this.images = this.shuffle(this.images);
  }

  getPages():void {
    this.pages = this._localStorage.returnPages();
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
