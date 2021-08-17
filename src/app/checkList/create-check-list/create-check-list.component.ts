import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { delay } from 'q';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckListService } from 'src/app/services/checkList/check-list.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistQuestionsComponent } from '../checklist-questions/checklist-questions.component';
import { ChecklistOptionsComponent } from '../checklist-options/checklist-options.component';



@Component({
  selector: 'app-create-check-list',
  templateUrl: './create-check-list.component.html',
  styleUrls: ['./create-check-list.component.css']
})

export class CreateCheckListComponent implements OnInit {
  mhd;
  edit = false;
  enable: boolean = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['number', 'desChkHecli', 'unitCehckListsHecli', 'namDepartmentHecli', 'process'];
  ListOfcheckLists: any;
  newRowObj: any;
  unit: { value: number; viewValue: string; }[];
  department: { value: number; viewValue: string; }[];

  constructor(
    public checkListService: CheckListService,
    public commonService: CommonService,
    private dialog: MatDialog,

  ) {
    this.fillDropDowns();
    this.getUsers();

  }
  fillDropDowns() {

    this.unit = [
      { value: 1, viewValue: 'بهداشت محيط ' },
      { value: 2, viewValue: 'ايمني' },
      { value: 3, viewValue: 'محيط زيست' },
      { value: 4, viewValue: 'بهداشت و ارگونومي' },
    ];

    this.department = [
      { value: 1, viewValue: 'آهن سازي' },
      { value: 2, viewValue: 'فولاد سازي' },
      { value: 3, viewValue: 'نورد گرم' },
      { value: 4, viewValue: 'نورد سرد' },
      { value: 4, viewValue: 'انرژي سيالات' },
      { value: 4, viewValue: 'مديريت شهري' },
      { value: 4, viewValue: 'تعميرگاه مرکزي' },
      { value: 4, viewValue: 'حمل و نقل' },
      { value: 4, viewValue: 'کنترل مواد' },
      { value: 4, viewValue: 'تعميرات مرکزي' },
      { value: 4, viewValue: 'ستادي' },
      { value: 4, viewValue: 'خدمات عمومي' },
    ];
  }
  ngOnInit() {
    this.newRowObj = {}
    this.getUsers();
  }

  public getUsers() {
    this.commonService.loading = true;
    this.checkListService.selectListOfcheckLists().subscribe((success) => {
      this.ListOfcheckLists = success;
      //this.userModel.roles = [{id: 282}];
      console.log('ListOfcheckLists', this.ListOfcheckLists)
      this.dataSource = new MatTableDataSource(this.ListOfcheckLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {
    debugger
    let object = {
      "desChkHecli": this.newRowObj.desChkHecli,
      "unitCehckListsHecli": this.newRowObj.unitCehckListsHecli,
      "namDepartmentHecli": this.newRowObj.namDepartmentHecli,
      "createDate": new Date()   
    }

    this.checkListService.insertListOfcheckLists(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getUsers();
      console.log('updateListOfcheckLists', success)
      this.newRowObj = {};
    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }
  public editRow(row) {
    row.updateDate=new Date() 
    this.edit = !this.edit;
    row['editable'] = true;
    debugger

  }

  public updateRow(row) {
    this.edit = !this.edit;
    this.checkListService.updateListOfcheckLists(row['eCheckListId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getUsers();
      console.log('updateListOfcheckLists', success)
        ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.checkListService.deleteListOfcheckLists(row['eCheckListId']).subscribe(
      (success) => {

        this.getUsers();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )
  }

  public addQuestions(row){
    const dialogRef = this.dialog.open(ChecklistQuestionsComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
     
      }
    )
  }
  public addOptions(row){
    const dialogRef = this.dialog.open(ChecklistOptionsComponent, {
      width: "85%",
      height: "85%",
      data: {
        //field: field,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
     
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}