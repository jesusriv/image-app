import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router'
import { StateService } from 'src/app/state.service';

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
  constructor(private _http: HttpService, private _router: Router, private _stateService: StateService) { }

  ngOnInit() {
  }

  select(e: any) {
    if (!this.clicked[e.originalTarget.firstChild.nodeValue]) {
      e.originalTarget.className += this.clickedClass;
      this.clicked[e.originalTarget.firstChild.nodeValue] = true;
      this.queries.push(e.originalTarget.firstChild.nodeValue);
    } else {
      this.clicked[e.originalTarget.firstChild.nodeValue] = false;
      e.originalTarget.className = 'option';
      this.queries.splice(this.queries.indexOf(e.originalTarget.firstChild.nodeValue, 1));
    }
  }

  send() {
    let page = Math.floor(Math.random() * 100);
    this._http.getImagesWithQuery(this.queries.join(', ').toLowerCase(), page).subscribe(d => {
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
