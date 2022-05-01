import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'jalali-moment'
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

  displayedColumns = ['number', 'namAssessorHsrch', 'assessmentDid', 'numberOfDuties', 'namPeriodHsrch'];
  listOfAllSchedulings: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  newRowObj: any;
  edit = false;
  enable: boolean = true;
  requests: any;

  schedules: any;
  period: { value: number; viewValue: string; }[];
  selectedPeriod;
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
    this.period = [
      { value: 1, viewValue: 'هفتگی' },
      { value: 2, viewValue: 'ماهانه' },
      { value: 3, viewValue: 'سالانه' },

    ];

  }

  public getAllSchedules() {
    debugger
    let assessmentDid = []
    let filteredRequests = []
    let obj = []
    this.commonService.loading = true;
    this.requestChecklist.selectAllListOfRequestCheckLists().subscribe((success) => {
      this.requests = success;
      this.evaluationDiscrepancies.selectAllListOfevaluationDiscrepancies().subscribe((success) => {
        this.schedules = success
        this.schedules.forEach(item1 => {
          assessmentDid = [];
          this.requests.forEach(item2 => {
            let requestDateHsrch = moment(item2.requestDateHsrch, 'YYYY/MM/DD');
            let dateMinusWeek = moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');
            let dateMinusMonth = moment(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');
            let dateMinusYear = moment(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 'YYYY/MM/DD');

            switch (this.selectedPeriod) {
              case 1:
                if (requestDateHsrch > dateMinusWeek) {
                  filteredRequests.push(item2)
                  this.requests = filteredRequests
                  if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
                    this.requests = this.requests.filter((value, index, self) =>
                      index === self.findIndex((t) => (
                        t.eRequestId === value.eRequestId
                      ))
                    )
                    assessmentDid.push(this.requests)
                  }

                }

                break;
              case 2:
                if (requestDateHsrch > dateMinusMonth) {
                  filteredRequests.push(item2)
                  this.requests = filteredRequests
                  if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
                    this.requests = this.requests.filter((value, index, self) =>
                      index === self.findIndex((t) => (
                        t.eRequestId === value.eRequestId
                      ))
                    )
                    assessmentDid.push(this.requests)
                  }

                }
                break;
              case 3:
                if (requestDateHsrch > dateMinusYear) {
                  filteredRequests.push(item2)
                  this.requests = filteredRequests
                  if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
                    this.requests = this.requests.filter((value, index, self) =>
                      index === self.findIndex((t) => (
                        t.eRequestId === value.eRequestId
                      ))
                    )
                    assessmentDid.push(this.requests)
                  }

                }
                break;

              default:
                
               if (requestDateHsrch > dateMinusWeek) 
                  filteredRequests.push(item2)
                  this.requests = filteredRequests
                  if (item1.namAssessorHsrch == item2.namAssessorHsrch) {
                    this.requests = this.requests.filter((value, index, self) =>
                      index === self.findIndex((t) => (
                        t.eRequestId === value.eRequestId
                      ))
                    )
                    assessmentDid.push(this.requests)
                  }

                

                break;

            }

          });
          if (this.selectedPeriod == item1.numPeriodHsrch) {
            obj.push({
              namAssessorHsrch: item1.namAssessorHsrch,
              assessmentDid: assessmentDid.length,
              numberOfDuties: item1.numberOfDuties,
              namPeriodHsrch: item1.namPeriodHsrch

            })
          }

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
