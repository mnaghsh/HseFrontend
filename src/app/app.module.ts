import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './share.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';



const myRoots: Routes = [
  {
    //canActivate: [LoginGuard],
    path: '', component: MenuComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'menu', component: MenuComponent},
     
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent
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
