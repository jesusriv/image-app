import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagesComponent } from './components/images/images.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LandingComponent } from './components/landing/landing.component';
import { ExploreComponent } from './components/explore/explore.component';

const routes: Routes = [
  {path: 'images/:location', component: ImagesComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'search', component: LandingComponent},
  { path: '', pathMatch: 'full', redirectTo: '/search' },
  // the ** will catch anything that did not match any of the above routes
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
