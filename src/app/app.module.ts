import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './share.module';
import { MatSliderModule } from '@angular/material/slider';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';



const myRoots: Routes = [
  {
    //canActivate: [LoginGuard],
    path: '', component: DashboardComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, SharedModule, 
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(myRoots,
      { useHash: true }
    ),

    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
