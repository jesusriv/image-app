import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { StateService } from '../../state.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  images: any;
  oneImage: string;

  constructor(private _http: HttpService, private _stateService: StateService, private _router: Router) { }

  ngOnInit() {
    this.explore();
  }

  explore():void {
    this._http.getRandomImages().subscribe(d => {
      this.images = d;
      this.images = this.shuffle(this.images);
    });
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
