import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './share.module';
import { MatSliderModule } from '@angular/material/slider';



const myRoots: Routes = [
  {
    //canActivate: [LoginGuard],
    path: '', component: IndexComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule
    ,
    SharedModule,
    

    RouterModule.forRoot(myRoots,
      { useHash: true }
    ),

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
