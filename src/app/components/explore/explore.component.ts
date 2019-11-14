import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {
  images: Array<Object>;
  oneImage: string;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this.explore();
  }

  ngOnDestroy() {
    document.getElementById('modal').className = 'mobile-menu';
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
  }

  explore():void {
    this._http.getRandomImages().subscribe((d: Array<Object>) => {
      this.images = d;
      this.images = this.shuffle(this.images);
    });
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
