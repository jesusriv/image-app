import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule } from "ngx-webstorage-service";
import { LocalStorageService } from './local-storage.service';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagesComponent } from './components/images/images.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    WelcomeComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [HttpService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
