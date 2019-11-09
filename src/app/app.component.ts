import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Image Splash';
  noFill: string;

  constructor(private _stateService: StateService) {}

  ngOnInit() {
    console.log(document)
    this._stateService.header() ? this.noFill = "noFill" : this.noFill = "";
  }

  open() {
    document.body.setAttribute('class', 'hidden  relative');
    document.body.parentElement.setAttribute('class', 'hidden');
    document.body.setAttribute('class', 'relative');
    document.getElementById('modal').className = "menu";
  }

  close() {
    document.body.setAttribute('class', '');
    document.body.parentElement.setAttribute('class', '');
    document.getElementById('modal').className = "mobile-menu";
  }
}
