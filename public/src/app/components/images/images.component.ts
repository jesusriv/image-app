import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    if (!this.images) {
      this.getImages();
    }
  }

  getImages() {
    this._httpService.getImages().subscribe(i => {
      this.images = i['results'];
    });
  }

}
