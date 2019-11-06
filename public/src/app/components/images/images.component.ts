import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router'
import { StateService } from '../../state.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit, OnDestroy {
  images: any;
  oneImage: string;

  constructor(
    private _router: Router, 
    private _stateService: StateService,
    private _localStorage: LocalStorageService) { }

  ngOnInit() {
    console.log(this._stateService.explore)
    if (this._stateService.explore == false) {
      // console.log(this._stateService.explore)
      this.getImages();
      if(!this._localStorage.getFromStorage()) {
        this._router.navigate(['/welcome']);
      }
    } else {
      console.log("hello")
      this.images = this._stateService.provideData();
    }
    this.images = this.shuffle(this.images);
  }

  ngOnDestroy() {
    if(this._stateService.explore) {
      this._stateService.fromExplore(false);
    }
  }

  getImages():void {
    this.images = this._localStorage.getFromStorage();
  }

  viewImage(e: any):void {
    this.oneImage = e.originalTarget.src;
  }

  close():void {
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
