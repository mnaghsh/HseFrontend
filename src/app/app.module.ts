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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { LocationsComponent } from './utils/loading/locations/locations/locations.component';
import { MessagesComponent } from './utils/messages/messages.component';
import { SchedulingComponent } from './checkList/scheduling/scheduling.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { EvaluationDiscrepanciesReportComponent } from './checkList/evaluationDiscrepanciesReport/evaluationDiscrepanciesReport.component';
import { RequestChecklistReportComponent } from './checkList/request-checklist-report/request-checklist-report.component';



const myRoots: Routes = [
  { path: 'login', component: LoginComponent },
  {
    canActivate: [LoginGuard],
    path: '', component: MenuComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'createCheckList', component: CreateCheckListComponent },
      { path: 'questions', component: ChecklistQuestionsComponent },
      { path: 'checklistAssesment', component: ChecklistAssesmentComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'checklistReport', component: ChecklistReportComponent },
      { path: 'users', component: UsersComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'scheduling', component: SchedulingComponent },
      { path: 'requestChecklistReport', component: RequestChecklistReportComponent},
      { path: 'evaluationDiscrepanciesReport', component: EvaluationDiscrepanciesReportComponent },
    ]
  }


];

@NgModule({
  declarations: [
    LoadingComponent,
    AppComponent,
    HomeComponent,
    MenuComponent,
    LoginComponent,
    CreateCheckListComponent,
    ChecklistReportComponent,
    ChecklistAssesmentComponent,
    ChecklistOptionsComponent,
    ChecklistQuestionsComponent,
    LocationsComponent,
    UsersComponent,
    MessagesComponent,
    SchedulingComponent,
    EvaluationDiscrepanciesReportComponent,
    RequestChecklistReportComponent
  ],
  imports: [      NgPersianDatepickerModule,

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
