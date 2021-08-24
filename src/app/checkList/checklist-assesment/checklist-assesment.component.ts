import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;
  locationId: any;
  checkListId: any;


  constructor(private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    public commonService: CommonService,
    public requestCheckListService: RequestChecklistService,
    
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
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
          debugger
          this.locationId = data.locationId;
          this.firstFormGroup = this._formBuilder.group({
            secondCtrl: [data.namLocation, Validators.required]
          });

        }
      )
    }
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
        data = this.commonService.selectedCheckListRow;
        this.checkListId = data.eCheckListId;
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: [data.desChkHecli, Validators.required]
        });

      }
    )

  }
  public addRow() {
    
    let object = {
      "desQuestionHeclq": "",
      "hecliECheckListId": "",
      "createDate": new Date()
    }

    this.requestCheckListService.insertListOfRequestCheckLists(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      //this.getChecklistQuestions();
      console.log('updateListOfcheckLists', success)
      //this.newRowObj = {};
    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

}
