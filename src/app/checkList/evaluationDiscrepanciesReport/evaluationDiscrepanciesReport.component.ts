import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CommonService } from 'src/app/services/common.service';
import { evaluationDiscrepanciesReportService } from 'src/app/services/evaluationDiscrepanciesReport/evaluationDiscrepanciesReport.service';
import { RequestChecklistService } from 'src/app/services/requestChecklistService/RequestChecklistService';
import { SchedulingService } from 'src/app/services/scheduling/scheduling.service';
import { UsersComponent } from 'src/app/users/users.component';
import { LocationsComponent } from 'src/app/utils/loading/locations/locations/locations.component';
import { CreateCheckListComponent } from '../create-check-list/create-check-list.component';

@Component({
  selector: 'app-evaluationDiscrepanciesReport',
  templateUrl: './evaluationDiscrepanciesReport.component.html',
  styleUrls: ['./evaluationDiscrepanciesReport.component.css']
})
export class EvaluationDiscrepanciesReportComponent implements OnInit {

  unit = [
    { value: 1, viewValue: 'هفتگی' },
    { value: 2, viewValue: 'ماهانه' },
    { value: 3, viewValue: 'سالانه' },
    { value: 4, viewValue: 'روزانه' }
  ]

  displayedColumns = ['number', 'namAssessorHsrch', 'assessmentDid', 'numberOfDuties'];
  listOfAllSchedulings: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  newRowObj: any;
  edit = false;
  enable: boolean = true;
  requests: any;
  schedules: any;
  constructor(public commonService: CommonService,
    public evaluationDiscrepancies: evaluationDiscrepanciesReportService,
    private dialog: MatDialog,
    public requestChecklist: RequestChecklistService,
    public SchedulingService: SchedulingService,

  ) { }

  ngOnInit(): void {
    this.newRowObj = {}
    let sumNumNumberHsrch
    this.getAllSchedules();


  }

  public getAllSchedules() {
    let assessmentDid = []
    let obj = []
    this.commonService.loading = true;
    this.requestChecklist.selectAllListOfRequestCheckLists().subscribe((success) => {
      this.requests = success;
      this.evaluationDiscrepancies.selectAllListOfevaluationDiscrepancies().subscribe((success) => {
        this.schedules = success
        this.schedules.forEach(item1 => {
          assessmentDid = [];
          this.requests.forEach(item2 => {
            if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
              assessmentDid.push(success)
            }
          });
          obj.push({
            namAssessorHsrch: item1.namAssessorHsrch,
            assessmentDid: assessmentDid.length,
            numberOfDuties: item1.numberOfDuties,
          })
          this.dataSource = new MatTableDataSource(obj);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.commonService.loading = false;
        });
      })
    })
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



}
