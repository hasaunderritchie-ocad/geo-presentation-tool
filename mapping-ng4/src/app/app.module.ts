import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ViewEncapsulation } from '@angular/core'


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [  // components go here
    AppComponent, NavbarComponent
  ],
  imports: [  // modules go here
    BrowserModule,
  ],
  providers: [],  // services go here
  bootstrap: [AppComponent]  // no touchy.
})
export class AppModule { }
