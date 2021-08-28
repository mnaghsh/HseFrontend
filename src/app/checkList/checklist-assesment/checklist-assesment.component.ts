import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationsComponent } from 'src/app/utils/loading/locations/locations/locations.component';
import { CreateCheckListComponent } from '../create-check-list/create-check-list.component';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { ChecklistQuestionService } from 'src/app/services/checklistQuestions/checklist-question.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-checklist-assesment',
  templateUrl: './checklist-assesment.component.html',
  styleUrls: ['./checklist-assesment.component.css']
})
export class ChecklistAssesmentComponent implements OnInit {
  displayedColumns = ['number', 'desQuestionHeclq', 'process'];
  edit = false;
  newRowObj: any;
  checklistId: any;
  checklistName: any;
  enable: boolean = true;
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });
  // thirdFormGroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required]
  // });
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  stepperOrientation: Observable<StepperOrientation>;
  locationId: any;
  firstLevel = this.fb.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
    forthCtrl: ['']
  });
  namLocation: any;
  desChkHecli: any;
  requestChecklistObject: { locationIdHsrch: any; namLocationHsrch: any; hecliECheckListId: any; assessorIdHsrch: any; namAssessorHsrch: string; requestDescriptionHsrch: any; createDate: Date; };
  openQuestions = false;

  ListOfcheckListsQuestions: any;




  constructor(private fb: FormBuilder,
    public checkListQuestionService: ChecklistQuestionService,
    private dialog: MatDialog,
    public commonService: CommonService,
    public requestCheckListService: RequestChecklistService,
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
    this.openQuestions = false
  }


  ngOnInit(): void {
    this.newRowObj = {}
  

  }
  selectCheckList() {
    const dialogRef = this.dialog.open(CreateCheckListComponent, {
      width: "auto%",
      height: "auto%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        this.checklistId = data.eCheckListId;
        this.desChkHecli = data.desChkHecli;
        // this.firstLevel.value.firstCtrl=data.desChkHecli
        this.firstLevel.controls['firstCtrl'].setValue(data.desChkHecli);
        // this.firstLevel = this.fb.group({
        //   firstCtrl: [data.desChkHecli, Validators.required]

        // });

      }
    )

  }
  selectLocations() {
    {
      const dialogRef = this.dialog.open(LocationsComponent, {
        width: "auto%",
        height: "auto%",
        data: {
          // checkListId: row.eCheckListId,
          //  checkListName: row.desChkHecli,
        }
      });
      dialogRef.afterClosed().subscribe(
        (data) => {

          this.locationId = data.locationId;
          this.namLocation = data.namLocation;
          // this.firstLevel.value.secondCtrl=data.namLocation
          this.firstLevel.controls['secondCtrl'].setValue(data.namLocation);

          // this.firstLevel = this.fb.group({
          //   secondCtrl: [data.namLocation, Validators.required]
          // });
        }
      )
    }
  }
  addRequestChecklist() {
    // const chklist = this.firstLevel.get('firstCtrl').validator({} as AbstractControl);
    // const loc = this.firstLevel.get('secondCtrl').validator({} as AbstractControl);
    // const assesor = this.firstLevel.get('thirdCtrl').validator({} as AbstractControl);
    // if (chklist && chklist.required && chklist && chklist.required && assesor && assesor.required) {
    //   return true;
    // }

    if (!this.firstLevel.valid) {
      this.commonService.showEventMessage("لطفا همه ی فیلد های ستاره دار را تکمیل کنید.", 5000, "green")
      this.openQuestions = false
      return;

    }
    else {
      this.getChecklistQuestions();
      this.openQuestions = true
      this.requestChecklistObject = {
        "locationIdHsrch": this.locationId,
        "namLocationHsrch": this.desChkHecli,
        "hecliECheckListId": this.checklistId,
        "assessorIdHsrch": this.firstLevel.value.thirdCtrl,
        "namAssessorHsrch": "نقش",
        "requestDescriptionHsrch": this.firstLevel.value.forthCtrl,
        "createDate": new Date()
      }
      console.log('addRequestChecklist', this.requestChecklistObject)

      // this.requestCheckListService.insertListOfRequestCheckLists(this.requestChecklistObject).subscribe((success) => {
      //   this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      //   console.log('updateListOfcheckLists', success)
      //   this.nextLevelPermision=true;

      // },
      //   (error) => {
      //     this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      //     this.nextLevelPermision=false;

      //   }
      // )
    }
  }

  public getChecklistQuestions() {
    this.commonService.loading = true;
   
    this.checkListQuestionService.selectListOfQuestionsOfCheckList(this.checklistId).subscribe((success) => {
      this.ListOfcheckListsQuestions = success;
      console.log('ListOfcheckListsQuestions', this.ListOfcheckListsQuestions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsQuestions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {

    let object = {
      "desQuestionHeclq": this.newRowObj['desQuestionHeclq'],
      "hecliECheckListId": this.checklistId,
      "createDate": new Date()
    }

    this.checkListQuestionService.insertListOfcheckListsQuestions(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistQuestions();
      console.log('updateListOfcheckLists', success)
      this.newRowObj = {};
    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }
  public editRow(row) {
    row.updateDate = new Date()
    this.edit = !this.edit;
    row['editable'] = true;
  }

  public updateRow(row) {
    this.edit = !this.edit;
    this.checkListQuestionService.updateListOfcheckListsQuestions(row['eQuestionId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getChecklistQuestions();
      console.log('updateListOfcheckListsQuestions', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListQuestionService.deleteListOfcheckListsQuestions(row['eQuestionId']).subscribe(
      (success) => {

        this.getChecklistQuestions();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }



}
