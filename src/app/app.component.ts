import { Component, OnInit } from '@angular/core';
import { StateService } from './state.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Image Splash';
  noFill: string;

  constructor(private _stateService: StateService, private _localStorage: LocalStorageService) {}

  ngOnInit() {
    this._stateService.header() ? this.noFill = "noFill" : this.noFill = "";
  }
}
