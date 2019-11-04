import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../http.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: any;

  constructor(private _httpService: HttpService, private _stateService: StateService) { }

  ngOnInit() {
    if (!this.images) {
      this.getImages();
    }
  }

  getImages() {
    this.images = this._stateService.provideData();
  }

}
