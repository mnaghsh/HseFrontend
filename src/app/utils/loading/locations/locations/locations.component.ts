import { Component, OnInit, ViewChild, OnChanges, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';
import { ChecklistQuestionService } from 'src/app/services/checklistQuestions/checklist-question.service';
import { ChecklistOptionsService } from 'src/app/services/checklistOptions/checklist-options.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationsService } from 'src/app/services/locations/locations.service';



@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
 

  ListOfcheckListsOptions: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];
  checklistId: any;
  checklistName: any;
  displayedColumns: string[];

  constructor(
    public locationsService: LocationsService,
    public commonService: CommonService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public recievedData
  ) {
    if(commonService.activeUser.accessLevel== "مدیر"){
      this.displayedColumns = ['number', 'namLocation', 'process'];
    }
    else{
      this.displayedColumns = ['number', 'namLocation'];

    }
    // this.checklistId = recievedData.checkListId
    // this.checklistName = recievedData.checkListName
    this.getLocations();
  }

  ngOnInit() {
    this.newRowObj = {}
   
  }

  public getLocations() {
    this.commonService.loading = true;
    this.locationsService.selectAllListOflocations().subscribe((success) => {
      this.ListOfcheckListsOptions = success;
      console.log('ListOfcheckListsOptions', this.ListOfcheckListsOptions)
      this.dataSource = new MatTableDataSource(this.ListOfcheckListsOptions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }
  

  public addRow() {
    
    let object = {
      "namLocation": this.newRowObj.namLocation,
     // "namLocation": this.checklistId,
      // "createDate": new Date()
    }

    this.locationsService.insertListOflocations(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getLocations();
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
    this.locationsService.updateListOflocations(row['locationId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getLocations();
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
    this.locationsService.deleteListOflocations(row['locationId']).subscribe(
      (success) => {

        this.getLocations();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  selectRow(row){
    console.log(row)
    if(!this.edit){
      this.dialogRef.close(row)
    }
    
  }

 
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
}