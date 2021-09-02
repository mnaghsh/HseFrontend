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
import { CreateCheckListComponent } from './checkList/create-check-list/create-check-list.component';
import { LoadingComponent } from './utils/loading/loading.component';
import { ChecklistReportComponent } from './checkList/checklist-report/checklist-report.component';
import { ChecklistAssesmentComponent } from './checkList/checklist-assesment/checklist-assesment.component';
import { ChecklistOptionsComponent } from './checkList/checklist-options/checklist-options.component';
import { ChecklistQuestionsComponent } from './checkList/checklist-questions/checklist-questions.component';
import { LocationsComponent } from './utils/loading/locations/locations/locations.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



const myRoots: Routes = [
  {
    //canActivate: [LoginGuard],
    path: '', component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'createCheckList', component: CreateCheckListComponent },
      { path: 'questions', component: ChecklistQuestionsComponent },
      { path: 'checklistAssesment', component: ChecklistAssesmentComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'checklistReport', component: ChecklistReportComponent },

      

    ]
  }
];

@NgModule({
  declarations: [
    LoadingComponent,
    AppComponent,
    HomeComponent,
    MenuComponent,
    CreateCheckListComponent,
    ChecklistReportComponent,
    ChecklistAssesmentComponent,
    ChecklistOptionsComponent,
    ChecklistQuestionsComponent,
    LocationsComponent
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


  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
