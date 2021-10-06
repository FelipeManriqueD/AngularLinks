import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { AccountModule } from './components/account/account.module';
import { NavigationComponent } from './shared/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountModule
  ],
  exports: [
    
  ],
  providers: [
    {provide: 'googleTagManagerId',  useValue: 'GTM-KZSR6BM'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
