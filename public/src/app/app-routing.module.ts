import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesComponent } from './components/images/images.component';

const routes: Routes = [
  {path: 'images', component: ImagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
