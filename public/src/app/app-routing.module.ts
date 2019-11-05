import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesComponent } from './components/images/images.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {path: 'images', component: ImagesComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'explore', component: LandingComponent},
  { path: '', pathMatch: 'full', redirectTo: '/explore' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
