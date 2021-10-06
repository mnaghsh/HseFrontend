import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { UsersComponent } from 'src/app/users/users.component';
import { CreateCheckListComponent } from '../create-check-list/create-check-list.component';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  displayedColumns = ['number', 'namAssessorHsrch', 'hecliECheckListId', 'datSchedulingHscls', 'namLocationHsrch', 'process'];
  listOfAllSchedulings: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  newRowObj: any;
  edit = false;
  enable: boolean = true;
  constructor(public commonService: CommonService,
    public schedulingService: SchedulingService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.newRowObj = {}
    this.getAllSchedules();
  }

  public getAllSchedules() {
    this.commonService.loading = true;
    this.schedulingService.selectAllListOfScheduling().subscribe((success) => {
      this.listOfAllSchedulings = success;
      console.log('listOfAllUsers', this.listOfAllSchedulings)
      this.dataSource = new MatTableDataSource(this.listOfAllSchedulings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.commonService.loading = false;
    });
  }

  public addRow() {

    let object = {
      "eSchedulingId": this.newRowObj.eSchedulingId,
      "assessorIdHsrch": this.newRowObj.assessorId,
      "hecliECheckListId": this.newRowObj.hecliECheckListId,
      "datSchedulingHscls": this.newRowObj.datSchedulingHscls,
      // "locationIdHsrch":  this.newRowObj.eSchedulingId,
      "namLocationHsrch": this.newRowObj.namLocationHsrch,
      "namAssessorHsrch": this.newRowObj.namAssessorHsrch,
    }

    this.schedulingService.insertListOfScheduling(object).subscribe((success) => {
      this.commonService.showEventMessage("ايجاد رديف با موفقيت انجام شد.", 3000, "green")
      this.getAllSchedules();
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
    this.schedulingService.updateListOfScheduling(row['eSchedulingId'], row).subscribe((success) => {
      this.commonService.showEventMessage("ويرايش رديف با موفقيت انجام شد.", 3000, "green")
      this.getAllSchedules();
      ;

    },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
      }
    )

  }

  public deleteRow(row) {

    console.log('del', row)
    this.schedulingService.deleteListOfScheduling(row['eSchedulingId']).subscribe(
      (success) => {

        this.getAllSchedules();
        //this.edit = !this.edit;
        this.commonService.showEventMessage("حذف رديف با موفقيت انجام شد.", 3000, "red")
        console.log('sucess', success)


      },
      (error) => {
        this.commonService.showEventMessage("خطايي به وجود آمده يا ارتباط با سرور قطع مي باشد.", 3000, "green")
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

  selectAssessor() {
    const dialogRef = this.dialog.open(UsersComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        this.newRowObj.assessorId = data.id;
        this.newRowObj.namAssessorHsrch = data.firstname + ' ' + data.lastname;
        // this.firstLevel.controls['firstCtrl'].setValue(data.namChkHecli);
      }
    )

  }
  selectCheckList() {
    const dialogRef = this.dialog.open(CreateCheckListComponent, {
      width: "80%",
      height: "80%",
      direction: "rtl",
      data: {
        // checkListId: row.eCheckListId,
        //  checkListName: row.desChkHecli,
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {

        this.newRowObj.hecliECheckListId = data.eCheckListId;
        this.newRowObj.namChkHecli = data.namChkHecli;
        
      }
    )

  }

}
