import { Component, OnInit } from '@angular/core';
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-checklist-assesment',
  templateUrl: './checklist-assesment.component.html',
  styleUrls: ['./checklist-assesment.component.css']
})
export class ChecklistAssesmentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });
  // thirdFormGroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required]
  // });
  stepperOrientation: Observable<StepperOrientation>;
  locationId: any;
  checkListId: any;
  firstLevel = this.fb.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required],
    forthCtrl: ['']
  });
  namLocation: any;
  desChkHecli: any;
  nextLevelPermision = true;
  requestChecklistObject: { locationIdHsrch: any; namLocationHsrch: any; hecliECheckListId: any; assessorIdHsrch: any; namAssessorHsrch: string; requestDescriptionHsrch: any; createDate: Date; };


  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    public commonService: CommonService,
    public requestCheckListService: RequestChecklistService,
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }


  ngOnInit(): void {

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

        this.checkListId = data.eCheckListId;
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
      return;
    }
    this.requestChecklistObject = {
      "locationIdHsrch": this.locationId,
      "namLocationHsrch": this.desChkHecli,
      "hecliECheckListId": this.checkListId,
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
