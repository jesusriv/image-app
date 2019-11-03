import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  options: string[] = [
    'Home', 
    'Fashion', 
    'Business', 
    'Gym', 
    'New York', 
    'Technology', 
    'Halloween',
    'Outdoors'
  ];
  clickedClass: string  = " clicked";
  queries: string[];
  clicked = {};
  constructor() { }

  ngOnInit() {
  }

  select(e: any) {
    // this.queries.push(e.originalTarget.firstChild.nodeValue);
    if (!this.clicked[e.originalTarget.className]) {
      e.originalTarget.className += this.clickedClass;
      this.clicked[e.originalTarget.className] = true;
    } else {
      this.clicked[e.originalTarget.className] = false;
      console.log(e.originalTarget.className);
      console.log(e.originalTarget.className.split(' ').splice(1, 1));
      console.log(e.originalTarget.className);
    }
  }

}
